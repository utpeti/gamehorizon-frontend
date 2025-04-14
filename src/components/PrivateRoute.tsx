import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const [authStatus, setAuthStatus] = useState<
    "checking" | "authenticated" | "unauthenticated"
  >("checking");
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_API_URL}/users/auth-status`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAuthStatus(response.ok ? "authenticated" : "unauthenticated");
      } catch (error) {
        console.error("Auth check failed", error);
        setAuthStatus("unauthenticated");
      }
    }

    checkAuth();
  }, []);

  if (authStatus === "checking") {
    return <div>Loading...</div>;
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
