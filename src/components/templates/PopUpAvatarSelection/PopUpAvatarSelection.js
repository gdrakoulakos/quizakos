import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./PopUpAvatarSelection.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { updateUserAvatar } from "@/services/authService";

export default function PopUpAvatarSelection({
  setShowPopUpAvatarSelection,
  setIsLoading,
  hasAtLeastTwoGoldenRibbons,
}) {
  const [avatarCategoryClicked, setAvatarCategoryClicked] =
    useState("classicAvatars");
  const [avatarSelected, setAvatarSelected] = useState(null);
  const [displayedAvatars, setDisplayedAvatars] = useState([]);
  const classicAvatars = Array.from(
    { length: 29 },
    (_, index) => `/images/avatars/default/avatar-${index + 1}.png`,
  );
  const specialAvatars = Array.from(
    { length: 17 },
    (_, index) => `/images/avatars/special/special-avatar-${index + 1}.png`,
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

  useEffect(() => {
    if (avatarCategoryClicked === "classicAvatars") {
      setDisplayedAvatars(classicAvatars);
    } else if (
      avatarCategoryClicked === "specialAvatars" &&
      hasAtLeastTwoGoldenRibbons
    ) {
      setDisplayedAvatars(specialAvatars);
    } else {
      setDisplayedAvatars(classicAvatars);
    }
  }, [avatarCategoryClicked]);

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
        <div className={styles.avatarsContainerHeader}>
          <button
            className={`${styles.classicAvatarsHeader} ${avatarCategoryClicked === "classicAvatars" ? styles.selectedCategory : ""}`}
            onClick={() => setAvatarCategoryClicked("classicAvatars")}
          >
            Κλασικά
          </button>
          <button
            className={`${styles.specialAvatarsHeader} ${avatarCategoryClicked === "specialAvatars" ? styles.selectedCategory : ""}`}
            onClick={() => setAvatarCategoryClicked("specialAvatars")}
            disabled={!hasAtLeastTwoGoldenRibbons}
          >
            Special
          </button>
        </div>
        <div className={styles.avatarsContainer}>
          {displayedAvatars &&
            displayedAvatars.map((avatar) => (
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
          <ButtonOk
            buttonText="ΟΚ"
            onClick={handleAvatarSave}
            isDisabled={!avatarSelected}
          />
        </div>
      </div>
    </div>
  );
}
