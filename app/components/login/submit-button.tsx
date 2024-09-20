export default function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      className="w-full rounded-xl bg-gradient-to-b from-primary to-secondary p-2.5 text-white"
    >
      {children}
    </button>
  );
}
