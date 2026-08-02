"use client";
import styles from "./info.module.css";
import { motion } from "motion/react";
import Accordion from "@/components/molecules/Accordion/Accordion";
import faqs from "@/contents/faqs.json";

export default function info() {
  return (
    <motion.div
      className={styles.infoSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1>Πληροφορίες</h1>

      <div className={styles.infoBody}>
        <div className={styles.faqContainer}>
          {faqs.map((faq) => (
            <Accordion
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        <p className={styles.copyRights}>
          {new Date().getFullYear()} George Drakoulakos <br /> All Rights
          Reserved
        </p>
      </div>
    </motion.div>
  );
}
