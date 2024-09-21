"use client";

import { useState } from "react";
import { MailOpenIcon, SendIcon, StarIcon, Trash2Icon } from "lucide-react";

export default function Nav() {
  const [active, setActive] = useState("Inbox");
  const nav_items = [
    { name: "Inbox", icon: <MailOpenIcon size={20} />, length: "(0)" },
    { name: "Favoritos", icon: <StarIcon size={20} />, length: "(0)" },
    { name: "Enviados", icon: <SendIcon size={20} />, length: "(0)" },
    { name: "Lixeira", icon: <Trash2Icon size={20} />, length: "(0)" },
  ];

  return (
    <nav className="flex gap-5 xl:flex-col">
      {nav_items.map((item) => (
        <button
          key={item.name}
          onClick={() => setActive(item.name)}
          className={`flex items-center justify-between rounded-xl p-2.5 xl:w-full ${active === item.name ? "bg-white shadow" : ""}`}
        >
          <div className="flex items-center gap-2.5">
            <span className={active === item.name ? "text-primary" : ""}>
              {item.icon}
            </span>
            <span
              className={`text-lg xl:flex ${active === item.name ? "flex" : "hidden"}`}
            >
              {item.name}
            </span>
          </div>
          <span className="hidden text-foreground xl:flex">{item.length}</span>
        </button>
      ))}
    </nav>
  );
}
