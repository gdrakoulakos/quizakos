import { QuizContext } from "@/context/AppContext";
import styles from "./Avatar.module.css";
import Image from "next/image";

export default function Avatar({ size, src, onClick, avatarSelected }) {
  const { loggedInUserName } = QuizContext();
  const {
    loggedInUserInfo,
    userIcon,
    defaultAvatar,
    classicAvatar,
    specialAvatar,
    selected,
  } = styles;

  return (
    <>
      {src && size ? (
        <Image
          className={`${userIcon} ${
            src?.includes("/special/") ? specialAvatar : classicAvatar
          } ${avatarSelected === src ? selected : ""} `}
          src={src}
          alt="Avatar"
          width={size}
          height={size}
          loading="eager"
          onClick={onClick}
        />
      ) : (
        <div className={defaultAvatar} style={{ width: size, height: size }}>
          {loggedInUserName?.charAt(0).toUpperCase()}
        </div>
      )}
    </>
  );
}
