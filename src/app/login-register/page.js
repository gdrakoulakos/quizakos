"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styles from "./login-register.module.css";
import EyeIcon from "@/components/atoms/Icons/EyeIcon";
import GoogleIcon from "@/components/atoms/Icons/GoogleIcon";
import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import { QuizContext } from "@/context/AppContext";
import PopUpInfoMessage from "@/components/templates/PopUpInfoMessage/PopUpInfoMessage";
import { validateSignUp } from "@/utils/validation";
import LoadingSpinner from "@/components/organisms/LoadingSpinner/LoadingSpinner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [name, setName] = useState("");
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    isLoggedIn,
    loggedInUserData,
    showPopUpInfoMessage,
    setShowPopUpInfoMessage,
  } = QuizContext();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setIsLoading(false);

    if (error) {
      alert(error.message);
    }
  };

  const signUp = async (email, password, name) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      console.error("Signup error:", error.message);
      setValidationMessage(error.message);
      setShowPopUpInfoMessage(true);
      return;
    }
    window.location.href = "/";
  };

  const signIn = async (email, password) => {
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      console.error("Login error:", error.message);
      setValidationMessage("Το email ή ο κωδικός είναι λάθος");
      setShowPopUpInfoMessage(true);
      return;
    }

    window.location.href = "/";
  };

  const logout = async () => {
    setIsLoading(true);

    const { error } = await supabase.auth.signOut();
    setIsLoading(false);

    if (error) {
      console.error(error.message);
    } else {
      window.location.href = "/";
    }
  };

  const deleteAccount = async () => {
    setIsLoading(true);
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
    setIsLoading(false);

    if (response.ok) {
      await supabase.auth.signOut();

      window.location.href = "/";
    } else {
      console.error(result.error);
    }
  };

  const confirmDelete = () => {
    const ok = window.confirm(
      "Θες σίγουρα να διαγράψεις τον λογαριασμό σου μαζί με τα βραβεία σου?",
    );

    if (ok) {
      deleteAccount();
    }
  };

  const handleSignUp = () => {
    const validationErrors = validateSignUp({
      nickname: name,
      email,
      password,
    });

    if (password !== confirmationPassword) {
      validationErrors.confirmationPassword =
        "Ο κωδικός επιβεβαίωσης δεν ταιριάζει";
    }

    const firstError = Object.values(validationErrors)[0];

    if (firstError) {
      setValidationMessage(firstError);
      setShowPopUpInfoMessage(true);
      return;
    }

    signUp(email, password, name);
  };

  return (
    <main className={styles.signInSignUpSection}>
      {isLoading && <LoadingSpinner message="Φόρτωση" isFullScreen={true} />}
      {showPopUpInfoMessage && <PopUpInfoMessage message={validationMessage} />}
      <h1>{isLoggedIn ? "Προφίλ" : "Σύνδεση/Εγγραφή"}</h1>
      {isLoggedIn && (
        <div className={styles.userProfile}>
          <ButtonOk onClick={logout} buttonText="Αποσύνδεση" />
          <hr className={styles.seperator} />
          <div className={styles.deleteAccountContainer}>
            <p>
              Για την διαγραφή του λογαριασμού σου, πάτησε{" "}
              <a className={styles.clickableText} onClick={confirmDelete}>
                εδώ
              </a>{" "}
            </p>{" "}
            <p></p>
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <div className={styles.signInSignUpContainer}>
          <div className={styles.inputContainer}>
            {isSignUpClicked && (
              <label className={styles.label}>
                <input
                  placeholder="Ψευδώνυμο"
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
                placeholder="Κωδικός"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {isSignUpClicked && (
              <label className={styles.label}>
                <span className={styles.icon}>
                  <EyeIcon />
                </span>
                <input
                  type="password"
                  placeholder="Επιβεβαίωση Κωδικού"
                  value={confirmationPassword}
                  onChange={(e) => setConfirmationPassword(e.target.value)}
                />
              </label>
            )}
            <div className={styles.signInUpPromptContainer}>
              {isSignUpClicked ? (
                <p
                  onClick={() => setIsSignUpClicked((prev) => !prev)}
                  className={styles.clickableText}
                >
                  Εχω λογαριασμό
                </p>
              ) : (
                <div className={styles.signUpPromptContainer}>
                  <p>
                    Δεν έχεις λογαριασμό;{" "}
                    <a
                      onClick={() => setIsSignUpClicked((prev) => !prev)}
                      className={styles.clickableText}
                    >
                      Κάνε εγγραφή
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
          {!isSignUpClicked && (
            <ButtonOk
              onClick={() => signIn(email, password)}
              buttonText="Συνδεση"
            />
          )}
          {isSignUpClicked && (
            <ButtonOk onClick={handleSignUp} buttonText="Εγγραφή" />
          )}
        </div>
      )}

      {!isLoggedIn && (
        <div className={styles.socialLoginContainer}>
          <hr className={styles.seperator} />
          <p>Διαφορετικά κάνε σύνδεση ή εγγραφή με:</p>
          <GoogleIcon onClick={loginWithGoogle} className={styles.googleIcon} />
        </div>
      )}
    </main>
  );
}
