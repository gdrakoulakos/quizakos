"use client";
import CardQuizzes from "@/components/organisms/CardQuizzes/CardQuizzes";
import { QuizContext } from "../../context/AppContext";
import { useEffect } from "react";

export default function myQuizzes() {
  const { allAthenaeumCourses, setCurrentInstitution } = QuizContext();

  useEffect(() => {
    setCurrentInstitution("authenaeum");
  }, []);

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
