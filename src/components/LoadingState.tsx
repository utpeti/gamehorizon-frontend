interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({
  message = "Loading...",
}: LoadingStateProps) {
  return (
    <div className="uk-container uk-margin-top uk-text-center">
      <div uk-spinner="ratio: 2"></div>
      <p>{message}</p>
    </div>
  );
}
