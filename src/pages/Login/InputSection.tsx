interface InputSectionProps {
  labelText: string;
}

export default function InputSection({ labelText }: InputSectionProps) {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 text-xs font-bold mb-2">
        {labelText.toUpperCase()}
      </label>
      <input
        type={labelText === "password" ? "password" : "text"}
        id={labelText}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
}
