"use server";

import { db } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

interface CreateNewUserProps {
  name: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export const createNewUser = async ({
  name,
  lastName,
  username,
  email,
  password,
}: CreateNewUserProps) => {
  if (!name || !lastName || !username || !email || !password) {
    throw new Error("Campos não preenchidos.");
  }

  const existingUser = await db.user.findUnique({
    where: {
      username,
    },
  });

  if (existingUser) {
    throw new Error("Este nome de usuário já está em uso. Tente outro.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      lastName,
      username,
      email,
      password: hashedPassword,
    },
  });

  revalidatePath("/");
};
