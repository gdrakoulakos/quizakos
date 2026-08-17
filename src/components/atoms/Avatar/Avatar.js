import { QuizContext } from "@/context/AppContext";
import styles from "./Avatar.module.css";
import Image from "next/image";

export default function Avatar({ size }) {
  const { loggedInUserName, userAvatar } = QuizContext();
  const {
    loggedInUserInfo,
    userIcon,
    defaultAvatar,
    classicAvatar,
    specialAvatar,
  } = styles;

  return (
    <>
      {userAvatar && size ? (
        <Image
          className={`${userIcon} ${
            userAvatar?.includes("/special/") ? specialAvatar : classicAvatar
          } `}
          src={userAvatar}
          alt="Avatar"
          width={size}
          height={size}
          loading="eager"
        />
      ) : (
        <div className={defaultAvatar} style={{ width: size, height: size }}>
          {loggedInUserName?.charAt(0).toUpperCase()}
        </div>
      )}
    </>
  );
}
