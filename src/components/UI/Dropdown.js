import { useState } from "react";
import classes from "./Dropdown.module.css";

const Dropdown = (props) => {
  const [value, setValue] = useState(props.value);
  const options = props.options;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
    props.onChange(event.target.value);
  }
  return (
    <select onChange={valueChangeHandler} className={props.className} value={value}>
      {options.map((option) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
};

export default Dropdown;
