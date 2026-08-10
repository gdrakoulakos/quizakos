import { useState } from "react";
import styles from "./SignInForm.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import GoogleIcon from "@/components/atoms/Icons/GoogleIcon";
import { signInWithGoogle, signInWithPassword } from "@/services/authService";

export default function SignInForm({
  isForgotPasswordClicked,
  setIsForgotPasswordClicked,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  setIsSignUpClicked,
  setIsLoading,
  setValidationMessage,
  setShowPopUpInfoMessage,
}) {
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

  return (
    <div className={styles.signInFormSection}>
      <h1> Σύνδεση</h1>
      <div className={styles.signInContainer}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Κωδικός"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className={styles.forgotPasswordContainer}>
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
        </div>
      </div>
    </div>
  );
}
