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
import {
  signInWithGoogle,
  signInWithPassword,
  signOut,
  deleteAccount,
  resetPassword,
  signUp,
} from "@/services/authService";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [name, setName] = useState("");
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const router = useRouter();
  const {
    isLoggedIn,
    loggedInUserData,
    showPopUpInfoMessage,
    setShowPopUpInfoMessage,
  } = QuizContext();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithPassword = async (email, password) => {
    try {
      setIsLoading(true);
      await signInWithPassword(email, password);
    } catch (error) {
      console.error(error.message);
      setValidationMessage("Το email ή ο κωδικός είναι λάθος");
      setShowPopUpInfoMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    const ok = window.confirm(
      "Θες σίγουρα να διαγράψεις τον λογαριασμό σου μαζί με τα βραβεία σου?",
    );

    if (ok) {
      deleteAccount();
    }
  };

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      await resetPassword(email);
      setValidationMessage(
        "Σχεδόν έτοιμο! 🎉 Πάτησε το link που σου στείλαμε στο email σου για να αλλάξεις τον κωδικό σου.",
      );
      setShowPopUpInfoMessage(true);
    } catch (error) {
      setValidationMessage(error.message);
      setShowPopUpInfoMessage(true);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("email", email);

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
    if (error) {
      console.error("Signup error:", error.message);
      setValidationMessage(error.message);
      setShowPopUpInfoMessage(true);
      return;
    }
    window.location.href = "/?signupSuccess=true";
  };

  return (
    <main className={styles.signInSignUpSection}>
      {isLoading && <LoadingSpinner message="Φόρτωση" isFullScreen={true} />}
      {showPopUpInfoMessage && <PopUpInfoMessage message={validationMessage} />}
      <h1>{isLoggedIn ? "Προφίλ" : isSignUpClicked ? "Εγγραφή" : "Σύνδεση"}</h1>
      {isLoggedIn && (
        <div className={styles.userProfile}>
          <ButtonOk onClick={handleSignOut} buttonText="Αποσύνδεση" />
          <hr className={styles.seperator} />
          <div className={styles.deleteAccountContainer}>
            <p>
              Για την διαγραφή του λογαριασμού σου, πάτησε{" "}
              <a className={styles.clickableText} onClick={handleDeleteAccount}>
                εδώ
              </a>{" "}
            </p>{" "}
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
            {!isForgotPasswordClicked && (
              <label className={styles.label}>
                <span className={styles.icon}>
                  <EyeIcon
                    onClick={() => setShowPassword((prev) => !prev)}
                  />{" "}
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Κωδικός"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            )}
            {isSignUpClicked && (
              <label className={styles.label}>
                <span className={styles.icon}>
                  <EyeIcon
                    onClick={() => setShowConfirmationPassword((prev) => !prev)}
                  />{" "}
                </span>
                <input
                  type={showConfirmationPassword ? "text" : "password"}
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
              ) : !isForgotPasswordClicked ? (
                <div className={styles.signUpPromptContainer}>
                  <p>
                    Ξέχασες τον κωδικό σου; Κάνε κλικ{" "}
                    <a
                      onClick={() => setIsForgotPasswordClicked(true)}
                      className={styles.clickableText}
                    >
                      εδώ
                    </a>
                  </p>
                </div>
              ) : (
                <p
                  onClick={() => (window.location.href = "/login-register")}
                  className={styles.clickableText}
                >
                  Επιστροφή
                </p>
              )}
            </div>
          </div>
          {!isSignUpClicked && (
            <>
              {!isForgotPasswordClicked ? (
                <>
                  <ButtonOk
                    onClick={() => handleSignInWithPassword(email, password)}
                    buttonText="Σύνδεση"
                  />
                  <p>
                    Δεν έχεις λογαριασμό;{" "}
                    <a
                      onClick={() => setIsSignUpClicked((prev) => !prev)}
                      className={styles.clickableText}
                    >
                      Κάνε εγγραφή
                    </a>
                  </p>
                </>
              ) : (
                <ButtonOk
                  onClick={handleResetPassword}
                  buttonText="Αποστολή email αλλαγής κωδικού"
                />
              )}
            </>
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
          <GoogleIcon
            onClick={handleGoogleSignIn}
            className={styles.googleIcon}
          />
        </div>
      )}
    </main>
  );
}
