interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <div className="text-center container mx-auto mt-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200 mx-auto"></div>
      <p>{message}</p>
    </div>
  );
}
