import { useRef, useState } from "react";
import InputSection from "./InputSection";

function Login() {
  const [userInputValue, setUserInputValue] = useState<string>("");
  const [passwordInputValue, setPasswordInputValue] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_API_URL}/igdb/login`
      );
      const resData = await response.json();
    } catch (err) {
      console.error("Error while logging in", err);
      setError(err instanceof Error ? err.message : "Failed to login");
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
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-[#F3E8EE] mb-8">Login</h1>
        <form
          className="bg-white p-6 rounded-lg shadow-md w-96"
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
          <a href="/register" className="text-blue-500 hover:text-blue-700">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
