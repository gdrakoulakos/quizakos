import ButtonOk from "@/components/atoms/ButtonOk/ButtonOk";
import styles from "./PopUpAvatarSelection.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { updateUserAvatar } from "@/services/authService";
import { QuizContext } from "@/context/AppContext";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PopUpInfoMessage from "../PopUpInfoMessage/PopUpInfoMessage";
import Avatar from "@/components/atoms/Avatar/Avatar";

export default function PopUpAvatarSelection({
  setShowPopUpAvatarSelection,
  hasAtLeastTwoGoldenRibbons,
}) {
  const { setLoadingSpinner, showPopUpInfoMessage, setShowPopUpInfoMessage } =
    QuizContext();
  const [avatarCategoryClicked, setAvatarCategoryClicked] =
    useState("classicAvatars");
  const [avatarSelected, setAvatarSelected] = useState(null);
  const [displayedAvatars, setDisplayedAvatars] = useState([]);
  const {
    popupWrapper,
    popupContent,
    closeButton,
    title,
    avatarsContainerHeader,
    classicAvatarsHeader,
    selectedCategory,
    specialAvatarsHeader,
    avatarsContainer,
    avatarIcon,
    buttonContainer,
  } = styles;

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
    setLoadingSpinner({ show: true, isFullScreen: true });

    try {
      await updateUserAvatar(avatarSelected);
      setShowPopUpAvatarSelection(false);
    } catch (error) {
      console.error("Error saving avatar:", error);
    }
    setLoadingSpinner({ show: false });
  };

  useEffect(() => {
    if (avatarCategoryClicked === "classicAvatars") {
      setAvatarSelected(null);
      setDisplayedAvatars(classicAvatars);
    } else if (
      avatarCategoryClicked === "specialAvatars" &&
      hasAtLeastTwoGoldenRibbons
    ) {
      setAvatarSelected(null);
      setDisplayedAvatars(specialAvatars);
    } else if (
      avatarCategoryClicked === "specialAvatars" &&
      !hasAtLeastTwoGoldenRibbons
    ) {
      setShowPopUpInfoMessage(true);
      setAvatarCategoryClicked("classicAvatars");
    } else {
      setDisplayedAvatars(classicAvatars);
    }
  }, [avatarCategoryClicked]);

  return (
    <div className={popupWrapper}>
      {showPopUpInfoMessage && (
        <PopUpInfoMessage message="Για να ξεκλειδώσεις τα special avatars πρέπει πρώτα να έχεις κερδίσει τουλάχιστον δύο Χρυσές Ροζέτες." />
      )}
      <div className={popupContent}>
        <button
          className={closeButton}
          onClick={() => setShowPopUpAvatarSelection(false)}
        >
          ×
        </button>
        <p className={title}>Διάλεξε το avatar που σου ταιριάζει:</p>
        <div className={avatarsContainerHeader}>
          <label
            className={`${classicAvatarsHeader} ${avatarCategoryClicked === "classicAvatars" ? selectedCategory : ""}`}
            onClick={() => setAvatarCategoryClicked("classicAvatars")}
          >
            Κλασικά
          </label>
          <label
            className={`${specialAvatarsHeader} ${
              avatarCategoryClicked === "specialAvatars" ? selectedCategory : ""
            } `}
            onClick={() => setAvatarCategoryClicked("specialAvatars")}
          >
            Special
            {!hasAtLeastTwoGoldenRibbons && <LockRoundedIcon />}
          </label>
        </div>
        <div className={avatarsContainer}>
          {displayedAvatars &&
            displayedAvatars.map((avatar) => (
              <Avatar
                key={avatar}
                size={80}
                src={avatar}
                avatarSelected={avatarSelected}
                onClick={() => setAvatarSelected(avatar)}
              />
            ))}
        </div>
        {avatarSelected && (
          <div className={buttonContainer}>
            <ButtonOk buttonText="ΟΚ" onClick={handleAvatarSave} />
          </div>
        )}
      </div>
    </div>
  );
}
