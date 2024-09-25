"use server";

import { db } from "../lib/prisma";
import { revalidatePath } from "next/cache";

interface CreateNewMessageProps {
  recipient: string;
  sender: string;
  subject: string;
  message: string;
}

export const createNewMessage = async ({
  recipient,
  sender,
  subject,
  message,
}: CreateNewMessageProps) => {
  if (!recipient || !sender || !subject || !message) {
    throw new Error("Campos não preenchidos.");
  }

  const recipient_exists = await db.user.findUnique({
    where: {
      email: recipient,
    },
  });

  if (!recipient_exists) {
    throw new Error("Usuário não encontrado.");
  }

  await db.message.create({
    data: {
      recipient_email: recipient,
      sender_email: sender,
      subject,
      message,
    },
  });

  revalidatePath("/");
};
