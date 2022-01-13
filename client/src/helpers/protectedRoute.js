import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ element, path }) => {
  const isAuth = localStorage.getItem("isAuth");
  return isAuth ? <Outlet /> : <Navigate to="/user/login" />;
};

export default ProtectedRoute;
