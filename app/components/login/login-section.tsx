"use client";

import { useState } from "react";
import SignIn from "./signin";
import SignUp from "./signup";

export default function LoginSection() {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <section className="w-full max-w-lg space-y-5">
      {showSignUp ? <SignUp /> : <SignIn />}

      <div className="flex flex-col items-center text-foreground">
        <span>
          {showSignUp ? "Já tem uma conta ?" : "Ainda não tem uma conta ?"}
        </span>
        <button
          onClick={() => setShowSignUp(!showSignUp)}
          className="text-primary hover:underline"
        >
          {showSignUp ? "Fazer login" : "Criar conta"}
        </button>
      </div>
    </section>
  );
}
