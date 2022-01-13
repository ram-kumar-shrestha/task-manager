import "./inputButton.css";

const InputButton = ({ name, value, className, id, onClickHandler }) => {
  return (
    <input
      type="button"
      name={name}
      value={value}
      className={className}
      id={id}
      onClick={onClickHandler}
    />
  );
};

export default InputButton;
