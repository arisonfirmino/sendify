import { PencilIcon } from "lucide-react";

export default function WriteButton() {
  return (
    <button className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-b from-primary to-secondary p-2.5 text-white">
      <PencilIcon size={16} />
      Escrever
    </button>
  );
}
