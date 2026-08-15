"use client";
import styles from "./quiz.module.css";
import QuizCardQuestion from "@/components/organisms/QuizCardQuestion/QuizCardQuestion";
import { QuizContext } from "../../context/AppContext";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import PopUpInfoMessage from "@/components/templates/PopUpInfoMessage/PopUpInfoMessage";

export default function Quiz() {
  const {
    selectedQuiz,
    setDefaultQuestions,
    selectedQuizId,
    setSelectedQuizId,
    defaultQuestions,
    setSelectedQuiz,
    displayedQuestionIndex,
    numberOfQuestions,
    setNumberOfQuestions,
    showPopUpInfoMessage,
    displayedQuestionId,
    setDisplayedQuestionId,
    setLoadingSpinner,
  } = QuizContext();

  const [cookies] = useCookies(["quiz_id", "total_questions"]);
  const router = useRouter();

  const motionProps = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.2 },
  };

  useEffect(() => {
    setLoadingSpinner({
      show: true,
      message: "Φόρτωση ερωτήσεων...",
      isFullScreen: true,
    });

    const activeQuizId = selectedQuizId || cookies.quiz_id;
    const activeQuestionsCount = numberOfQuestions || cookies.total_questions;

    if (!activeQuizId) {
      router.push("/");
      return;
    }

    if (!selectedQuizId) setSelectedQuizId(activeQuizId);
    if (!numberOfQuestions) setNumberOfQuestions(activeQuestionsCount);
  }, [selectedQuizId, numberOfQuestions, cookies]);

  useEffect(() => {
    const currentQuizId = selectedQuizId || cookies.quiz_id;
    const count = numberOfQuestions || cookies.total_questions;

    if (!currentQuizId || !count) return;

    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("default_questions")
          .select(
            `
            *,
            lesson:default_lessons!lesson_id (
              id,
              lesson_name,
              grade:default_grades!grade_id (
                id,
                grade_name
              )
            )
          `,
          )
          .eq("lesson_id", currentQuizId);

        if (error) {
          console.error("Supabase Error:", error);
        } else if (data) {
          const shuffled = [...data].sort(() => Math.random() - 0.5);
          const pickedQuestions = shuffled.slice(0, Number(count));
          setDefaultQuestions(pickedQuestions);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      }
    };

    fetchData();
  }, [selectedQuizId, numberOfQuestions]);

  useEffect(() => {
    if (!defaultQuestions || defaultQuestions.length === 0) return;

    if (!selectedQuiz) {
      const foundQuizQuestions = defaultQuestions
        .filter((q) => q.lesson_id === (selectedQuizId || cookies.quiz_id))
        .sort(() => Math.random() - 0.5);

      if (foundQuizQuestions.length > 0) {
        const lessonName = foundQuizQuestions[0]?.lesson?.lesson_name;
        const gradeName = foundQuizQuestions[0]?.lesson?.grade?.grade_name;

        const quizTest = {
          quiz_id: selectedQuizId || cookies.quiz_id,
          grade: gradeName,
          lesson: lessonName,
          questions: foundQuizQuestions.map((q) => ({
            id: q.id,
            title: q.question,
            question_img: q.question_img,
            availableAnswers: [
              q.answer_1,
              q.answer_2,
              q.answer_3,
              q.answer_4,
            ].sort(() => Math.random() - 0.5),
            correctAnswer: q.correct_answer,
          })),
        };
        setSelectedQuiz(quizTest);
      }
    }
  }, [defaultQuestions]);

  useEffect(() => {
    if (selectedQuiz) {
      setDisplayedQuestionId(
        selectedQuiz.questions[displayedQuestionIndex]?.id,
      );
      setLoadingSpinner({ show: false });
    }
  }, [displayedQuestionIndex, selectedQuiz]);

  return (
    <>
      {selectedQuiz && (
        <AnimatePresence mode="wait">
          <div className={styles.quizSection}>
            {showPopUpInfoMessage && (
              <PopUpInfoMessage
                message="Εντόπισες κάποιο λάθος στη συγκεκριμένη ερώτηση; Στείλε email στο quizakos@gmail.com αναφέροντας το ID της ερώτησης:"
                questionId={displayedQuestionId}
                action={"report-question"}
              />
            )}
            <motion.div
              className={styles.quizNew}
              key={displayedQuestionIndex}
              {...motionProps}
            >
              <QuizCardQuestion />
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </>
  );
}
