import { Message, User } from "@prisma/client";
import EmailItem from "./email-item";

interface EmailListProps {
  received_messages: (Message & { sender: User })[];
}

export default function EmailList({ received_messages }: EmailListProps) {
  return (
    <div className="w-full space-y-5 xl:max-w-80">
      <div className="space-y-2.5">
        <h2 className="text-lg font-semibold">
          Inbox{" "}
          <span className="text-base font-normal text-foreground">
            ({received_messages.length})
          </span>
        </h2>
      </div>

      {received_messages.map((message) => (
        <EmailItem key={message.id} message={message} />
      ))}
    </div>
  );
}
