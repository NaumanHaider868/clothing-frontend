import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, ready } = useAuth();
  const location = useLocation();

  if (!ready) return null;
  if (!user) {
    const next = `${location.pathname}${location.search}`;
    return <Navigate to={`/login?next=${encodeURIComponent(next)}`} replace />;
  }
  return children;
}
