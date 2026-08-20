"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import styles from "./login-register.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
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
import UserProfile from "@/components/templates/UserProfile/UserProfile";
import SignInForm from "@/components/templates/SignInForm/SignInForm";
import ForgotPasswordForm from "@/components/templates/ForgotPasswordForm/ForgotPasswordForm";
import SignUpForm from "@/components/templates/SignUpForm/SignUpForm";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const router = useRouter();
  const {
    isLoggedIn,
    loggedInUserData,
    showPopUpInfoMessage,
    setShowPopUpInfoMessage,
    validationMessage,
    setValidationMessage,
    setLoadingSpinner,
  } = QuizContext();

  const handleGoogleSignIn = async () => {
    try {
      setLoadingSpinner({
        show: true,
        isFullScreen: true,
        message: "Σύνδεση με τον Google λογαριασμό σου...",
      });
      await signInWithGoogle();
    } catch (error) {
      console.error(error.message);
      setLoadingSpinner({ show: false });
    }
  };

  return (
    <main className={styles.loginOrRegisterSection}>
      {showPopUpInfoMessage && <PopUpInfoMessage message={validationMessage} />}

      {isLoggedIn ? (
        <UserProfile />
      ) : isForgotPasswordClicked ? (
        <ForgotPasswordForm
          setValidationMessage={setValidationMessage}
          setShowPopUpInfoMessage={setShowPopUpInfoMessage}
          setIsForgotPasswordClicked={setIsForgotPasswordClicked}
        />
      ) : isSignUpClicked ? (
        <SignUpForm
          setIsSignUpClicked={setIsSignUpClicked}
          setShowPopUpInfoMessage={setShowPopUpInfoMessage}
          validationMessage={validationMessage}
          setValidationMessage={setValidationMessage}
        />
      ) : (
        <SignInForm
          isForgotPasswordClicked={isForgotPasswordClicked}
          setIsForgotPasswordClicked={setIsForgotPasswordClicked}
          setIsSignUpClicked={setIsSignUpClicked}
          setValidationMessage={setValidationMessage}
          setShowPopUpInfoMessage={setShowPopUpInfoMessage}
        />
      )}

      {!isLoggedIn && (
        <>
          <div className={styles.socialLoginContainer}>
            <hr className={styles.seperator} />
            <p>Διαφορετικά κάνε σύνδεση ή εγγραφή με:</p>
            <GoogleIcon
              onClick={handleGoogleSignIn}
              className={styles.googleIcon}
            />
          </div>
        </>
      )}
    </main>
  );
}
