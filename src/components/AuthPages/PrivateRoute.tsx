import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

interface PrivateRouteProps {
  element: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};
