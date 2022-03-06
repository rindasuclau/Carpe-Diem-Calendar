import { FIREBASE_API_KEY } from "../utils/utils";
import { authActions } from "./auth-slice";

export const authenticate = ({enteredEmail, enteredPassword, isLogin}) => {
    return async (dispatch) => {
      const loginUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + FIREBASE_API_KEY;
      const signUpUrl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + FIREBASE_API_KEY;
      const url = isLogin ? loginUrl : signUpUrl;
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        const data = await response.json();
    
        if (response.ok) {
          console.log(data);
          const token = data && data.idToken ? data.idToken : "";
          const expirationTime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          if (isLogin) {
            dispatch(authActions.login());
          } else {
            alert("Success!");
          }
        } else {
          let errorMessage = "Authentication failed!";
          if (data && data.error && data.error.message) {
               errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }
      } catch(error) {
        alert(error.message);
      }
      
    }
  }
  