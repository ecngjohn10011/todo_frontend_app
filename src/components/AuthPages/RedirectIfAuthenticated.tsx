import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

interface RedirectIfAuthenticatedProp {
  element: JSX.Element;
}

export const RedirectIfAuthenticated: React.FC<RedirectIfAuthenticatedProp> = ({
  element,
}) => {
  const { isAuthenticated } = useAuth();

  let route = `/dashboard`;
  return isAuthenticated ? (
    <Navigate
      replace
      to={route}
    />
  ) : (
    element
  );
};
