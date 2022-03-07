import { calculateRemainingTime, FIREBASE_API_KEY } from "../utils/utils";
import { authActions } from "./auth-slice";
import { calendarActions } from "./redux";

export const authenticate = ({ enteredEmail, enteredPassword, isLogin }) => {
  return async (dispatch) => {
    const loginUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      FIREBASE_API_KEY;
    const signUpUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
      FIREBASE_API_KEY;
    const url = isLogin ? loginUrl : signUpUrl;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        const token = data && data.localId ? data.localId : "";
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        if (isLogin) {
          dispatch(
            authHandler({ token, expiresIn: expirationTime, type: "LOGIN" })
          );
        } else {
          alert("Account created!");
        }
      } else {
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      alert(error.message);
    }
  };
};

export const authHandler = ({token, expiresIn, type}) => {
  return (dispatch) => {
      let remainingTime;
      if (type === "LOGIN") {
        remainingTime = calculateRemainingTime(expiresIn);
      } else {
        remainingTime = expiresIn;
      }
      if (token) {
        localStorage.setItem("token", token);
        dispatch(authActions.setToken(token));
        dispatch(calendarActions.setShowEventModal(false));
        dispatch(authActions.login());
      }
      if (remainingTime) {
        localStorage.setItem("expirationTime", remainingTime);
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("expirationTime");
          dispatch(authActions.logout());
          dispatch(authActions.setToken(null));
        }, remainingTime);
      }
  };
};
