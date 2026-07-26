"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loggedUserName, setLoggedUserName] = useState(null);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();

      const user = data.session?.user;

      if (user) {
        setLoggedUserName(user.user_metadata?.name);
      }
    }

    checkSession();
  }, []);

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

  const signUp = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (error) {
      console.error("Signup error:", error.message);
      return;
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      return;
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

  const deleteAccount = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("No user logged in");
      return;
    }

    const response = await fetch("/api/delete-account", {
      method: "DELETE",
      body: JSON.stringify({
        userId: user.id,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      await supabase.auth.signOut();

      window.location.href = "/login";
    } else {
      console.error(result.error);
    }
  };

  const confirmDelete = () => {
    const ok = window.confirm(
      "Are you sure you want to permanently delete your account?",
    );

    if (ok) {
      deleteAccount();
    }
  };

  return (
    <main>
      <h1>Login to Quizakos</h1>
      <div>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={() => signIn(email, password)}>Login</button>

        <button onClick={() => signUp(email, password, name)}>Sign Up</button>
        <button onClick={confirmDelete}>Delete Account</button>
      </div>
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
