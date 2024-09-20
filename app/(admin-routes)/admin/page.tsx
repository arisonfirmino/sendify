import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/app/components/user";
import { db } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  const user = await db.user.findFirst({
    where: {
      id: session?.user.id,
    },
  });

  if (!user) {
    return <div>Usuário não encontrado.</div>;
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <User user={user} />
    </main>
  );
}
