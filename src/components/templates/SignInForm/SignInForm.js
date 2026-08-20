import { useState } from "react";
import styles from "./SignInForm.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import GoogleIcon from "@/components/atoms/Icons/GoogleIcon";
import { signInWithGoogle, signInWithPassword } from "@/services/authService";
import { QuizContext } from "@/context/AppContext";

export default function SignInForm({
  isForgotPasswordClicked,
  setIsForgotPasswordClicked,
  setIsSignUpClicked,
  setValidationMessage,
  setShowPopUpInfoMessage,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { setLoadingSpinner } = QuizContext();
  const handleSignInWithPassword = async (email, password) => {
    try {
      setLoadingSpinner({
        show: true,
        isFullScreen: true,
        message: "Σύνδεση...",
      });
      await signInWithPassword(email, password);
    } catch (error) {
      console.error(error.message);
      setValidationMessage("Το email ή ο κωδικός είναι λάθος");
      setShowPopUpInfoMessage(true);
    } finally {
      setLoadingSpinner({ show: false });
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
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
