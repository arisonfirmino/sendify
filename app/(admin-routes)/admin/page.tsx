import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import App from "@/app/components/app";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  const user = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
    include: {
      sent_messages: {
        include: {
          recipient: true,
          sender: true,
        },
        orderBy: {
          created_at: "desc",
        },
      },
      received_messages: {
        include: {
          recipient: true,
          sender: true,
        },
        orderBy: {
          created_at: "desc",
        },
      },
    },
  });

  if (!user) {
    return <div>Usuário não encontrado.</div>;
  }

  return (
    <main>
      <App user={user} />
    </main>
  );
}
