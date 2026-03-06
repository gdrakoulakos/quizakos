import styles from "./ButtonYesNo.module.css";

export default function ButtonYesNo({ name, handleButtonClick, action }) {
  return (
    <button
      className={` ${styles.buttonYesNo} ${styles[action]}`}
      onClick={handleButtonClick}
    >
      {name}
    </button>
  );
}
