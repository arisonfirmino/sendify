import { getServerSession } from "next-auth";
import LoginSection from "../components/login/login-section";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center p-5">
      <LoginSection />
    </main>
  );
}
