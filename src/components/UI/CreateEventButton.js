import classes from "./CreateEventButton.module.css";
import plusImg from "../../assets/plus.svg";
import { useDispatch } from "react-redux";
import { calendarActions } from "../../store/redux";

const CreateEventButton = (props) => {
    const dispatch = useDispatch();

    const onCreateHandler = () => {
        dispatch(calendarActions.setShowEventModal(true));
    }
    return ( 
        <button className={classes.button} onClick={onCreateHandler}>
            <img src={plusImg} alt="create-event" className={classes.plus} />
            <span> Create</span>
        </button>
     );
}
 
export default CreateEventButton;