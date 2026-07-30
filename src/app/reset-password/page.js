"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./reset-password.module.css";
import EyeIcon from "@/components/atoms/Icons/EyeIcon";
import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false);

  const updatePassword = async () => {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Ο κωδικός σου άλλαξε επιτυχώς!");
  };

  return (
    <main className={styles.resetPasswordSection}>
      <h1>Νέος κωδικός</h1>

      <label className={styles.label}>
        <span className={styles.icon}>
          <EyeIcon onClick={() => setShowPassword((prev) => !prev)} />{" "}
        </span>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Κωδικός"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
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

      <ButtonOk onClick={updatePassword} buttonText="Αλλαγή κωδικού" />
    </main>
  );
}
