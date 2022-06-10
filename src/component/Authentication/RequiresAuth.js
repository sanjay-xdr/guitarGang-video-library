import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export default function RequiresAuth({ children }) {
  const { isLogin } = useAuth();
  const location = useLocation();

  return isLogin ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  );
}
