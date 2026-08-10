import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./UserProfile.module.css";
import { signOut, deleteAccount } from "@/services/authService";

export default function UserProfile({ setIsLoading }) {
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

  return (
    <div className={styles.userProfileSection}>
      <h1> Προφίλ</h1>
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
    </div>
  );
}
