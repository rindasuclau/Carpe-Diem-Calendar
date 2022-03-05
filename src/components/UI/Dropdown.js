import classes from "./Dropdown.module.css";

const Dropdown = (props) => {
  const options = props.options;
  const value = props.value;

  const valueChangeHandler = (event) => {
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
