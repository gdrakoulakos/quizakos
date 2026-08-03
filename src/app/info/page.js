"use client";
import styles from "./info.module.css";
import { motion } from "motion/react";
import Accordion from "@/components/molecules/Accordion/Accordion";
import faqs from "@/contents/faqs.json";
import Image from "next/image";

export default function info() {
  return (
    <motion.div
      className={styles.infoSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Πληροφορίες</h1>
      <p className={styles.infoIntro}>
        Εδώ απαντάμε στις πιο συχνές ερωτήσεις για να γνωρίσεις καλύτερα τον
        Quizako.
      </p>
      <div className={styles.infoBody}>
        <div className={styles.faqContainer}>
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              id={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
        <Image
          className={styles.quizakosWondering}
          src="/images/quizakos/quizakos-wondering.png"
          alt="Coming Soon"
          width={200}
          height={318}
        />
      </div>
      <p className={styles.copyRights}>
        {new Date().getFullYear()} George Drakoulakos <br /> All Rights Reserved
      </p>
    </motion.div>
  );
}
