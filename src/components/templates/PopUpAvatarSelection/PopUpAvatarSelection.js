import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./PopUpAvatarSelection.module.css";
import Image from "next/image";
import { useState } from "react";
import { updateUserAvatar } from "@/services/authService";

export default function PopUpAvatarSelection({
  setShowPopUpAvatarSelection,
  setIsLoading,
}) {
  const [avatarSelected, setAvatarSelected] = useState(null);
  const avatars = Array.from(
    { length: 29 },
    (_, index) => `/images/avatars/default/avatar-${index + 1}.png`,
  );

  const handleAvatarSave = async () => {
    if (!avatarSelected) return;
    setIsLoading(true);

    try {
      await updateUserAvatar(avatarSelected);
      setShowPopUpAvatarSelection(false);
    } catch (error) {
      console.error("Error saving avatar:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popupContent}>
        <button
          className={styles.closeButton}
          onClick={() => setShowPopUpAvatarSelection(false)}
        >
          ×
        </button>
        <p className={styles.title}>Διάλεξε το avatar που σου ταιριάζει:</p>
        <div className={styles.avatarsContainer}>
          {avatars.map((avatar) => (
            <Image
              key={avatar}
              className={`${styles.avatarIcon} ${avatarSelected === avatar ? styles.selected : ""}`}
              src={`${avatar}`}
              alt="Coming Soon"
              width={80}
              height={80}
              loading="eager"
              onClick={() => setAvatarSelected(avatar)}
            />
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <ButtonOk buttonText="ΟΚ" onClick={handleAvatarSave} />
        </div>
      </div>
    </div>
  );
}
