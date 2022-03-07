import { useState } from "react";
import classes from "./Checkbox.module.css";

const Checkbox = (props) => {
  const [checked, setChecked] = useState(props.checked);
  const labelName = props.color === "green" ? "Romania National Days" : props.color;
  const checkboxStyle = checked
    ? { backgroundColor: props.color, borderColor: props.color }
    : {};

  const changeHandler = () => {
    setChecked((prev) => {
        return !prev;
      });
    props.onChange({color: props.color, checked: !checked})
  };

  return (
    <label className={classes.label}>
      <input
        type="checkbox"
        onChange={changeHandler}
      />
      <svg
        aria-hidden="true"
        className={classes.checkbox}
        style={checkboxStyle}
        viewBox="0 0 15 11"
        fill="none"
      >
        <path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke={checked ? "#fff" : "none"}
        />
      </svg>
      <span className={classes.name}>{labelName}</span>
    </label>
  );
};

export default Checkbox;
