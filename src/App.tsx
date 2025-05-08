// src/App.jsx
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navbar from "./components/Navbar";
import Browse from "./pages/Browse/Browse";
import Likes from "./pages/Likes/Likes";
import Error from "./pages/Error/Error";
import ProtectedRoutes from "./assets/ProtectedRoutes";
import { AuthProvider } from "./assets/AuthContext.tsx";

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className={showNavbar ? "pt-16" : ""}>
        <Outlet />
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },

      {
        element: <ProtectedRoutes />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/browse", element: <Browse /> },
          { path: "/likes", element: <Likes /> },
        ],
      },

      { path: "*", element: <Navigate to="/" /> },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
