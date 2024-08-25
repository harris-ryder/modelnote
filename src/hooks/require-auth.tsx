import { useEffect, useState, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useApiStore } from "../store/api-store.ts";

interface RequireAuthProps {
  children: ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const checkAuth = useApiStore((s) => s.isAuthenticated);

  useEffect(() => {
    const verifyAuth = async () => {
      const authStatus = await checkAuth();
      setIsAuthenticated(authStatus);
      setIsLoading(false);
    };

    verifyAuth();
  }, [checkAuth]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/" />;

  return <>{children}</>;
};

