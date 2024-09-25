"use client";

import { useState } from "react";
import { Prisma } from "@prisma/client";
import EmailList from "./email-list";
import Sidebar from "./sidebar/sidebar";
import SendMessage from "./send-message";

interface AppProps {
  user: Prisma.UserGetPayload<{
    include: {
      received_messages: {
        include: {
          recipient: true;
          sender: true;
        };
      };
      sent_messages: {
        include: {
          recipient: true;
          sender: true;
        };
      };
    };
  }>;
}

export default function App({ user }: AppProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="flex w-full flex-col xl:flex-row">
      <Sidebar user={user} setShowForm={() => setShowForm(!showForm)} />
      <div className="pt-5">
        <EmailList received_messages={user.received_messages} />
      </div>
      {showForm && <SendMessage setShowForm={setShowForm} />}
    </main>
  );
}
