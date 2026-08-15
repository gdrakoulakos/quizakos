import { QuizContext } from "@/context/AppContext";
import styles from "./UserAvatar.module.css";
import Image from "next/image";

export default function UserAvatar({ size }) {
  const { loggedInUserName, userAvatar } = QuizContext();
  const { loggedInUserInfo, userIcon, defaultAvatar } = styles;

  return (
    <>
      {userAvatar && size ? (
        <Image
          className={userIcon}
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
