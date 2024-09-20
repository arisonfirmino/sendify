"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./input";
import SubmitButton from "./submit-button";
import { signIn } from "next-auth/react";

const schema = yup.object({
  emailOrUsername: yup.string().required("Este campo é obrigatório."),
  password: yup.string().required("Este campo é obrigatório."),
});

interface FormData {
  emailOrUsername: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        emailOrUsername: data.emailOrUsername,
        password: data.password,
      });

      if (result?.error) {
        if (result.error === "Usuário não cadastrado.") {
          setError("emailOrUsername", {
            type: "manual",
            message: "Usuário não cadastrado.",
          });
        } else if (result.error === "Senha incorreta.") {
          setError("password", {
            type: "manual",
            message: "Senha incorreta.",
          });
        }

        return;
      }

      router.replace("/admin");
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-5 rounded-xl border border-solid border-foreground p-5"
    >
      <Input
        type="text"
        placeholder="Email ou nome de usuário"
        register={{ ...register("emailOrUsername") }}
        error={errors.emailOrUsername}
      />
      <Input
        type="password"
        placeholder="Senha"
        register={{ ...register("password") }}
        error={errors.password}
      />
      <SubmitButton>Entrar</SubmitButton>
    </form>
  );
}
