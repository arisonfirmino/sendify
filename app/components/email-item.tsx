import { Message, User } from "@prisma/client";
import { StarIcon } from "lucide-react";
import { formatMessageDate } from "../helpers/formatMessageDate";

interface EmailItemProps {
  message: Message & { sender: User };
}

export default function EmailItem({ message }: EmailItemProps) {
  return (
    <div className="space-y-1.5 rounded-xl bg-white p-2.5 shadow-sm">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
            <h2 className="text-sm">
              {message.sender.name} {message.sender.lastName}
            </h2>
          </div>
          <p className="text-xs text-primary">
            Hoje,{" "}
            <span className="text-foreground">
              {formatMessageDate(message.created_at)}
            </span>
          </p>
        </div>
        <p className="truncate text-xs text-foreground">
          {message.sender_email}
        </p>
      </div>
      <div>
        <h3 className="truncate text-sm font-medium">{message.subject}</h3>
        <p className="truncate text-sm text-foreground">{message.message}</p>
      </div>
    </div>
  );
}
