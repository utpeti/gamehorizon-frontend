import { useRef, useState } from "react";
import { useAuth } from "../../assets/AuthContext";
import InputSection from "../../components/InputSection";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [userInputValue, setUserInputValue] = useState<string>("");
  const [passwordInputValue, setPasswordInputValue] = useState<string>("");
  const [, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const userInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from?.pathname || "/";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/users/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userInputValue,
            password: passwordInputValue,
          }),
        }
      );
      const resData = await response.json();
      if (response.ok) {
        login();
        navigate(from, { replace: true });
      }
      if (!response.ok) {
        throw new Error(resData.message || "Failed to login");
      }
    } catch (error) {
      console.error("Error while logging in: ", error);
      setError(error instanceof Error ? error.message : "Failed to login");
    } finally {
      setLoading(false);
    }
  }

  function handleChange() {
    if (userInputRef.current) {
      setUserInputValue(userInputRef.current.value);
    }
    if (passwordInputRef.current) {
      setPasswordInputValue(passwordInputRef.current.value);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-900 via-stone-700 to-stone-900">
      <div className="flex justify-center items-center pt-8 pb-16">
        <img src="/logo.png" alt="Logo" width={200} height={200} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-[#F3E8EE] mb-8">Login</h1>
        <form
          className="bg-gradient-to-b from-stone-500 to-indigo-300 p-6 rounded-lg shadow-md w-96"
          onSubmit={submit}
        >
          <InputSection labelText="email" inputRef={userInputRef} />
          <InputSection labelText="password" inputRef={passwordInputRef} />
          <button
            type="submit"
            onClick={handleChange}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-blue-500 hover:text-blue-700  mb-40"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
