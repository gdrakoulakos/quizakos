"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styles from "./login-register.module.css";
import EyeIcon from "@/components/atoms/Icons/EyeIcon";
import GoogleIcon from "@/components/atoms/Icons/GoogleIcon";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loggedUserName, setLoggedUserName] = useState(null);
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const router = useRouter();

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
    } else {
      window.location.href = "/";
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error.message);
    } else {
      window.location.href = "/";
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
    <main className={styles.signInSignUpSection}>
      <h1>Σύνδεση/Εγγραφή</h1>
      <div className={styles.signInSignUpContainer}>
        <div className={styles.inputContainer}>
          {isSignUpClicked && (
            <label className={styles.label}>
              <span className={styles.icon}>
                <UserIcon />
              </span>
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.name}
              />
            </label>
          )}
          <label className={styles.label}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            <span className={styles.icon}>
              <EyeIcon />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p onClick={() => setIsSignUpClicked((prev) => !prev)}>
            {isSignUpClicked
              ? "Εχω λογαριασμό"
              : "Δεν έχεις λογαριασμό; Κάνε Εγγραφή!"}
          </p>
        </div>
        {!isSignUpClicked && (
          <button onClick={() => signIn(email, password)}>Login</button>
        )}
        {isSignUpClicked && (
          <button onClick={() => signUp(email, password, name)}>Sign Up</button>
        )}
      </div>

      <p>Διαφορετικά κάνε σύνδεση ή εγγραφή με:</p>
      {!loggedUserName && <GoogleIcon onClick={loginWithGoogle} />}

      {loggedUserName && (
        <>
          <button onClick={confirmDelete}>Delete Account</button>
          <button onClick={logout}>Logout</button>
          <p style={{ color: "white" }}>Καλωσήρθες {loggedUserName}</p>
        </>
      )}
    </main>
  );
}
