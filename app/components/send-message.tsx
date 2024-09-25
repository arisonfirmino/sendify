import { XIcon } from "lucide-react";
import Form from "./form";

interface SendMessageProps {
  setShowForm: (value: boolean) => void;
}

export default function SendMessage({ setShowForm }: SendMessageProps) {
  return (
    <div className="fixed bottom-0 right-10 h-[512px] w-full max-w-lg space-y-2.5 overflow-hidden rounded-t-xl bg-white shadow">
      <div className="flex items-center justify-between bg-gradient-to-l from-primary to-secondary p-2.5">
        <span className="text-white">Nova mensagem</span>

        <button
          onClick={() => setShowForm(false)}
          className="text-red-600 active:text-foreground"
        >
          <XIcon size={16} />
        </button>
      </div>

      <Form />
    </div>
  );
}
