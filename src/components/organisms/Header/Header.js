import Link from "next/link";
import styles from "../Header/Header.module.css";

export default function Header() {
  const headerList = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Theory", link: "/theory" },
    { id: 3, name: "History", link: "/history" },
    { id: 4, name: "Instruments", link: "/instruments" },
    { id: 5, name: "About Us", link: "/aboutUs" },
  ];
  return (
    <>
      <header className={styles.header}>
        <nav>
          <ul className={styles.navList}>
            {headerList.map(({ id, link, name }) => (
              <li key={id}>
                <Link href={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
