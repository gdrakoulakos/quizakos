"use client";
import CardQuizzes from "@/components/organisms/CardQuizzes/CardQuizzes";
import { QuizContext } from "../../context/AppContext";

export default function myQuizzes() {
  const { allAthenaeumCourses } = QuizContext();
  return (
    <div>
      {allAthenaeumCourses.map((athenaeumCourse) => (
        <div key={athenaeumCourse}>
          <CardQuizzes group={athenaeumCourse} />
        </div>
      ))}
    </div>
  );
}
