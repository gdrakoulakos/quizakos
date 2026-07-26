import styles from "./Typography.module.css";

export default function Typography({ text, size }) {
  return <div className={styles[size]}>{text}</div>;
}
