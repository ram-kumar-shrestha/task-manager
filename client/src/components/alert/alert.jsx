import "./alert.css";

const Alert = ({ styleName, message }) => {
  return (
    <div className="message">
      <p className={styleName}>{message}</p>
    </div>
  );
};

export default Alert;
