import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
