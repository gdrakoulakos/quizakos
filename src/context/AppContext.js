const { createContext, useContext, useState, useEffect } = require("react");
import { supabase } from "@/lib/supabase";
import { useMediaQuery } from "react-responsive";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [loggedInUserData, setLoggedInUserData] = useState("");
  const [loggedInUserQuizProgress, setLoggedInUserQuizProgress] = useState([]);
  const [currentInstitution, setCurrentInstitution] = useState(null);
  const [defaultQuizData, setDefaultQuizData] = useState([]);
  const [defaultQuestions, setDefaultQuestions] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [displayedQuestionIndex, setDisplayedQuestionIndex] = useState(0);
  const [showPopUpResults, setShowPopUpResults] = useState(false);
  const [userProgressData, setUserProgressData] = useState([]);
  const [showPopUpAwardsInfo, setShowPopUpAwardsInfo] = useState(false);
  const [showPopUpConfirmation, setShowPopUpConfirmation] = useState(false);
  const [showPopUpInfoMessage, setShowPopUpInfoMessage] = useState(false);
  const [displayedQuestionId, setDisplayedQuestionId] = useState(null);
  const [popUpMessage, setPopUpMessage] = useState("");
  const [deleteAllScores, setDeleteAllScores] = useState(false);
  const [clickedAnswersResults, setClickedAnswersResults] = useState({
    correctAnswers: 0,
    incorrectAnswers: 0,
    totalAnswers: 0,
    incorrectAnswersData: [],
  });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;

      setIsLoggedIn(!!user);

      if (user) {
        setLoggedInUserName(
          user.user_metadata?.name?.split(" ")[0] ||
            user.user_metadata?.full_name?.split(" ")[0] ||
            "",
        );

        setLoggedInUserData(user);
      } else {
        setLoggedInUserName("");
        setLoggedInUserData(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function fetchUserQuizProgress() {
      const { data, error } = await supabase
        .from("user_lesson_progress")
        .select("*");

      if (error) {
        console.error("Error fetching quiz progress:", error);
        return;
      }

      setLoggedInUserQuizProgress(data);
    }

    fetchUserQuizProgress();
  }, [supabase]);

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
        isLoggedIn,
        loggedInUserName,
        loggedInUserData,
        loggedInUserQuizProgress,
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
        showPopUpAwardsInfo,
        setShowPopUpAwardsInfo,
        showPopUpConfirmation,
        setShowPopUpConfirmation,
        popUpMessage,
        setPopUpMessage,
        deleteAllScores,
        setDeleteAllScores,
        showPopUpInfoMessage,
        setShowPopUpInfoMessage,
        displayedQuestionId,
        setDisplayedQuestionId,
        isMobile,
        isTablet,
        isDesktop,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const QuizContext = () => useContext(AppContext);
