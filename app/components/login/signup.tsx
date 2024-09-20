"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./input";
import SubmitButton from "./submit-button";
import { createNewUser } from "@/app/actions/user";
import { signIn } from "next-auth/react";

const schema = yup.object({
  name: yup
    .string()
    .required("Este campo é obrigatório.")
    .min(3, "Este campo precisa de no minimo 3 caracteres."),
  lastName: yup
    .string()
    .required("Este campo é obrigatório.")
    .min(3, "Este campo precisa de no minimo 3 caracteres."),
  username: yup
    .string()
    .required("Este campo é obrigatório.")
    .min(3, "Este campo precisa de no minimo 3 caracteres.")
    .matches(
      /^[a-zA-Z0-9._%+-]+$/,
      "Este campo não pode conter caracteres especiais.",
    ),
  password: yup
    .string()
    .required("Este campo é obrigatório.")
    .min(6, "Este campo precisa ter no mínimo 6 caracteres."),
  passwordConfirmation: yup
    .string()
    .required("Este campo é obrigatório.")
    .oneOf([yup.ref("password")], "As senhas precisam ser iguais."),
});

interface FormData {
  name: string;
  lastName: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignUp() {
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
    const formData = {
      name: data.name,
      lastName: data.lastName,
      username: data.username,
      email: `${data.username}@sendify.com`,
      password: data.password,
    };

    try {
      await createNewUser(formData);

      await signIn("credentials", {
        redirect: false,
        email: `${data.username}@sendify.com`,
        password: data.password,
      });

      router.replace("/admin");

      reset();
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Este nome de usuário já está em uso. Tente outro."
      ) {
        setError("username", {
          type: "manual",
          message: error.message,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full space-y-5 rounded-xl border border-solid border-foreground p-5"
    >
      <div className="flex flex-col gap-5 md:flex-row">
        <Input
          type="text"
          placeholder="Nome"
          register={{ ...register("name") }}
          error={errors.name}
        />
        <Input
          type="text"
          placeholder="Sobrenome"
          register={{ ...register("lastName") }}
          error={errors.lastName}
        />
      </div>
      <Input
        type="text"
        placeholder="Nome de usuário"
        register={{ ...register("username") }}
        error={errors.username}
      />
      <Input
        type="password"
        placeholder="Senha"
        register={{ ...register("password") }}
        error={errors.password}
      />
      <Input
        type="password"
        placeholder="Confirmação de senha"
        register={{ ...register("passwordConfirmation") }}
        error={errors.passwordConfirmation}
      />
      <SubmitButton>Criar Conta</SubmitButton>
    </form>
  );
}
