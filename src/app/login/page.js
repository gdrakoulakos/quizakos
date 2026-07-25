"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedUserName, setLoggedUserName] = useState(null);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      if (!data) return;
      setLoggedUserName(data?.session?.user?.user_metadata?.name);
    }

    checkSession();
  }, [supabase]);

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert(error.message);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <main>
      <h1>Login to Quizakos</h1>
      {!loggedUserName && (
        <button onClick={loginWithGoogle}>Σύνδεση με Google</button>
      )}

      {loggedUserName && (
        <>
          <button onClick={logout}>Logout</button>
          <p style={{ color: "white" }}>Καλωσήρθες {loggedUserName}</p>
        </>
      )}
    </main>
  );
}
