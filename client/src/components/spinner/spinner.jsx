import "./spinner.css";

const Spinner = ({ loading }) => {
  return <>{loading && <span className="spinning-loader"></span>}</>;
};

export default Spinner;
