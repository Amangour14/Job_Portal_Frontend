import { Navigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  return auth.user ? <>{children}</> : <Navigate to="/login" />;
}
