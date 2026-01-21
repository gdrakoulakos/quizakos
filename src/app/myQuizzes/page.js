"use client";
import CardQuizzes from "@/components/organisms/CardQuizzes/CardQuizzes";
import { QuizContext } from "../../context/AppContext";

export default function myQuizzes() {
  const { allAthenaeumQuizCategories } = QuizContext();
  return (
    <div>
      {allAthenaeumQuizCategories.map((quiz) => (
        <div key={quiz}>
          <CardQuizzes category={quiz} />
        </div>
      ))}
    </div>
  );
}
