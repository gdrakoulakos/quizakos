import styles from "./SignUpForm.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import GoogleIcon from "@/components/atoms/Icons/GoogleIcon";
import { validateSignUp } from "@/utils/validation";
import { useState } from "react";
import { signUp } from "@/services/authService";

export default function SignUpForm({
  isForgotPasswordClicked,
  setIsForgotPasswordClicked,
  setIsSignUpClicked,
  setShowPopUpInfoMessage,
  validationMessage,
  setValidationMessage,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const handleSignUp = async () => {
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

    const { error } = await signUp(email, password, name);

    if (error) {
      console.error("Signup error:", error.message);
      setValidationMessage(error.message);
      setShowPopUpInfoMessage(true);
      return;
    }
    window.location.href = "/?signupSuccess=true";
  };

  return (
    <div className={styles.signUpFormSection}>
      <h1> Εγγραφή</h1>
      <div className={styles.signUpContainer}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>
            <input
              placeholder="Ψευδώνυμο"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.name}
            />
          </label>
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
          <label className={styles.label}>
            <span
              className={styles.eyeIcon}
              onClick={() => setShowConfirmationPassword((prev) => !prev)}
            >
              {showConfirmationPassword ? (
                <VisibilityOffIcon />
              ) : (
                <VisibilityIcon />
              )}
            </span>
            <input
              type={showConfirmationPassword ? "text" : "password"}
              placeholder="Επιβεβαίωση Κωδικού"
              value={confirmationPassword}
              onChange={(e) => setConfirmationPassword(e.target.value)}
            />
          </label>
        </div>
        <p
          onClick={() => setIsSignUpClicked((prev) => !prev)}
          className={styles.clickableText}
        >
          Εχω λογαριασμό
        </p>
      </div>
      <div className={styles.signInSignUpContainer}>
        <ButtonOk onClick={handleSignUp} buttonText="Εγγραφή" />
      </div>
    </div>
  );
}
