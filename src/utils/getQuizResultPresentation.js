import { useLaunchConfetti } from "@/customHooks";

const launchConfetti = useLaunchConfetti;

export function getQuizResultPresentation(
  scorePercentage,
  setMedal,
  setResultImg,
  setCongratulationsMessage,
  setHoppingEffect,
) {
  if (scorePercentage === 100) {
    setMedal({ img: "gold-medal" });
    setResultImg("/images/quizakos/quizakos-with-friends-4.png");
    setCongratulationsMessage("ΜΠΡΑΒΟ! Τα κατάφερες τέλεια!");
    setHoppingEffect(true);
    setTimeout(() => {
      launchConfetti();
    }, 500);
  } else if (scorePercentage >= 80) {
    setMedal({ img: "silver-medal" });
    setResultImg("/images/quizakos/quizakos4-shadow.png");
    setCongratulationsMessage("Μπράβο! Τα πήγες εξαιρετικά!");
  } else if (scorePercentage >= 60) {
    setResultImg("/images/quizakos/quizakos3-shadow.png");
    setCongratulationsMessage("Τα πήγες πολύ καλά! Συνέχισε έτσι!");
  } else if (scorePercentage >= 40) {
    setResultImg("/images/quizakos/quizakos2-shadow.png");
    setCongratulationsMessage("Ωραία προσπάθεια! Μπορείς και καλύτερα!");
  } else {
    setResultImg("/images/quizakos/quizakos1-shadow.png");
    setCongratulationsMessage("Μην τα παρατάς! Κάθε προσπάθεια μετράει!");
  }
}
