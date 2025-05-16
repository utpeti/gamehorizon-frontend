import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoutes() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-indigo-900 via-stone-700 to-stone-900">
        <div className="flex justify-center items-center pt-8 pb-16">
          <img src="/logo.png" alt="Logo" width={200} height={200} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-[#F3E8EE] mb-8">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
