interface DetailBlobProps {
  children: React.ReactNode;
}

export default function DetailBlob({ children }: DetailBlobProps) {
  return (
    <div className="bg-blue-950 hover:rounded-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 p-2 m-3 w-full">
      {children}
    </div>
  );
}
