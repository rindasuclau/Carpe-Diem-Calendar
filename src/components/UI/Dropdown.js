
const Dropdown = (props) => {
  const options = props.options;

  const valueChangeHandler = (event) => {
    props.onChange(event.target.value);
  }
  return (
    <select onChange={valueChangeHandler} className={props.className} value={props.value}>
      {options.map((option) => (
        <option key={option} value={option} >{option}</option>
      ))}
    </select>
  );
};

export default Dropdown;
