import { Navigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";
// import { useContext } from "react";
import Cookies from "js-cookie";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PrivateRoute({ children }: any) {
  const userCookie = Cookies.get("user");
  return userCookie ? <>{children}</> : <Navigate replace to="/login" />;
}

export default PrivateRoute;
