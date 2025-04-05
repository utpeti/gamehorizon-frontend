import InputSection from "./InputSection";

function Login() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-900 via-stone-700 to-stone-900">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-[#F3E8EE] mb-8">Login</h1>
        <form className="bg-white p-6 rounded-lg shadow-md w-96">
          <InputSection labelText="email" />
          <InputSection labelText="password" />
          <button
            type="submit"
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
