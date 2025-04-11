import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-indigo-900 via-stone-700 to-stone-900">
      <div className="text-[#F3E8EE] text-center ">
        <h1 className="text-4xl font-bold mb-8 pt-8">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
        <button
          className="cursor-pointer bg-indigo-400 rounded-2xl p-1"
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
