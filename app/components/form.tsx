"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SendHorizonalIcon } from "lucide-react";
import { createNewMessage } from "../actions/message";

const schema = yup.object({
  recipient: yup.string().required("Este campo é obrigatório."),
  subject: yup.string().required("Este campo é obrigatório."),
  message: yup.string().required("Este campo é obrigatório."),
});

interface FormData {
  recipient: string;
  subject: string;
  message: string;
}

export default function Form() {
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!session?.user?.email) {
      console.error("O usuário não está autenticado.");
      return;
    }

    const formData = {
      sender: session?.user.email,
      recipient: data.recipient,
      subject: data.subject,
      message: data.message,
    };

    await createNewMessage(formData);
    reset();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 px-5">
      <input
        type="text"
        placeholder="Destinatário"
        {...register("recipient")}
        className={`w-full border-b border-solid bg-transparent p-2.5 outline-none ${errors.recipient ? "border-red-600" : "border-foreground"}`}
      />
      <input
        type="text"
        placeholder="Assunto"
        {...register("subject")}
        className={`w-full border-b border-solid bg-transparent p-2.5 outline-none ${errors.recipient ? "border-red-600" : "border-foreground"}`}
      />
      <textarea
        placeholder="Escreva sua mensagem aqui"
        rows={11}
        {...register("message")}
        className={`w-full resize-none border-b border-solid bg-transparent p-2.5 outline-none ${errors.recipient ? "border-red-600" : "border-foreground"}`}
      ></textarea>

      <button
        type="submit"
        className="flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-b from-primary to-secondary px-2.5 py-1 text-sm text-white"
      >
        Enviar
        <SendHorizonalIcon size={14} />
      </button>
    </form>
  );
}
