const { createContext, useContext, useState, useEffect } = require("react");
import { supabase } from "@/lib/supabase";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentInstitution, setCurrentInstitution] = useState(null);
  const [defaultQuizData, setDefaultQuizData] = useState([]);
  const [defaultQuestions, setDefaultQuestions] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [displayedQuestionIndex, setDisplayedQuestionIndex] = useState(0);
  const [showPopUpResults, setShowPopUpResults] = useState(false);
  const [userProgressData, setUserProgressData] = useState([]);
  const [clickedAnswersResults, setClickedAnswersResults] = useState({
    correctAnswers: 0,
    incorrectAnswers: 0,
    totalAnswers: 0,
    incorrectAnswersData: [],
  });

  useEffect(() => {
    const loadProgress = () => {
      const localStoredUserProgress = localStorage.getItem("quiz_results");
      const progressData = localStoredUserProgress
        ? JSON.parse(localStoredUserProgress)
        : [];
      setUserProgressData(progressData);
    };

    loadProgress();

    window.addEventListener("quiz_results_updated", loadProgress);
    return () =>
      window.removeEventListener("quiz_results_updated", loadProgress);
  }, []);

  const institutionsDataMap = {
    default: defaultQuizData,
    athenaeum: [],
  };

  const currentInstitutionData = institutionsDataMap[currentInstitution] || [];

  useEffect(() => {
    const fetchAllDefaultQuizData = async () => {
      try {
        const { data, error } = await supabase.from("default_school_levels")
          .select(`
          id,
          level_name,
          grades:default_grades (
            id,
            grade_name,
            total_questions,
            school_level_id,
            lessons:default_lessons (
              id,
              lesson_name,
              quiz_description,
              imgCard,
              grade_id
            )
          )
        `);

        if (error) {
          console.error("Error fetching nested data:", error);
        } else {
          setDefaultQuizData(data);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchAllDefaultQuizData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        defaultQuestions,
        setDefaultQuestions,
        currentInstitutionData,
        setCurrentInstitution,
        currentInstitution,
        selectedQuizId,
        setSelectedQuizId,
        selectedQuiz,
        setSelectedQuiz,
        displayedQuestionIndex,
        setDisplayedQuestionIndex,
        clickedAnswersResults,
        setClickedAnswersResults,
        showPopUpResults,
        setShowPopUpResults,
        numberOfQuestions,
        setNumberOfQuestions,
        userProgressData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const QuizContext = () => useContext(AppContext);
