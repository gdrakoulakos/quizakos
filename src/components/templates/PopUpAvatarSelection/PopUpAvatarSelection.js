import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./PopUpAvatarSelection.module.css";
import Image from "next/image";
import { useState } from "react";
import { updateUserAvatar } from "@/services/authService";

export default function PopUpAvatarSelection({ setShowPopUpAvatarSelection }) {
  const [avatarSelected, setAvatarSelected] = useState(null);
  const avatars = [
    "avatar-1",
    "avatar-2",
    "avatar-3",
    "avatar-4",
    "avatar-5",
    "avatar-6",
    "avatar-7",
    "avatar-8",
    "avatar-9",
    "avatar-10",
    "avatar-11",
    "avatar-12",
    "avatar-13",
    "avatar-14",
    "avatar-15",
    "avatar-16",
    "avatar-17",
    "avatar-18",
    "avatar-19",
    "avatar-20",
    "avatar-21",
    "avatar-22",
    "avatar-23",
    "avatar-24",
    "avatar-25",
    "avatar-26",
    "avatar-27",
    "avatar-28",
  ];

  const handleAvatarSave = async () => {
    if (!avatarSelected) return;

    try {
      await updateUserAvatar(avatarSelected);
      setShowPopUpAvatarSelection(false);
    } catch (error) {
      console.error("Error saving avatar:", error);
    }
  };

  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popupContent}>
        <p className={styles.message}>Διάλεξε το avatar που σου ταιριάζει:</p>
        <div className={styles.avatarsContainer}>
          {avatars.map((avatar) => (
            <Image
              key={avatar}
              className={`${styles.avatarIcon} ${avatarSelected === avatar ? styles.selected : ""}`}
              src={`/images/avatars/${avatar}.png`}
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
