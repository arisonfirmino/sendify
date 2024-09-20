import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error: FieldError | undefined;
}

export default function Input({
  type,
  placeholder,
  register,
  error,
}: InputProps) {
  return (
    <div className="w-full space-y-1">
      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full rounded-xl border border-solid bg-white p-2.5 ${error ? "border-red-600 outline-red-600" : "border-foreground outline-primary"}`}
      />
      {error && <p className="ml-1.5 text-xs text-red-600">{error.message}</p>}
    </div>
  );
}
