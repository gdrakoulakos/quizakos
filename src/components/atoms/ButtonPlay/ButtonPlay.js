import Link from "next/link"
import styles from "../ButtonPlay/ButtonPlay.module.css"

export default function ButtonPlay () {
    return(
        <div className={styles.buttonContainer}>
            <Link href={"/quiz"}>
            <button>Play Now</button>
            </Link>
        </div>
    )
}