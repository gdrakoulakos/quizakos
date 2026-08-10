import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./ForgotPasswordForm.module.css";
import { resetPassword } from "@/services/authService";

export default function ForgotPasswordForm({
  email,
  setEmail,
  setIsLoading,
  setValidationMessage,
  setShowPopUpInfoMessage,
}) {
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

  return (
    <div className={styles.forgotPasswordFormSection}>
      <h1> Επαναφορά κωδικού</h1>
      <label className={styles.label}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <ButtonOk
        onClick={handleResetPassword}
        buttonText="Αποστολή email αλλαγής κωδικού"
      />
      <p
        onClick={() => (window.location.href = "/login-register")}
        className={styles.clickableText}
      >
        Επιστροφή
      </p>
    </div>
  );
}
