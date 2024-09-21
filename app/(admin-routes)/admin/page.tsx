import { authOptions } from "@/app/lib/auth";
import { db } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import Sidebar from "@/app/components/sidebar/sidebar";

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
    <main>
      <Sidebar user={user} />
    </main>
  );
}
