"use client";

const { createContext, useContext, useState, useEffect } = require("react");
import { supabase } from "@/lib/supabase";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState(
    "/images/avatars/default/avatar-1.png",
  );
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [loggedInUserQuizProgress, setLoggedInUserQuizProgress] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");
  const [currentInstitution, setCurrentInstitution] = useState(null);
  const [defaultQuizData, setDefaultQuizData] = useState([]);
  const [defaultQuestions, setDefaultQuestions] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [displayedQuestionIndex, setDisplayedQuestionIndex] = useState(0);
  const [showPopUpResults, setShowPopUpResults] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState({
    show: false,
    isFullScreen: false,
    message: "Φόρτωση...",
  });
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(600));
  const isTablet = useMediaQuery(theme.breakpoints.between(600, 1024));
  const isDesktop = useMediaQuery(theme.breakpoints.up(1024));

  const awardsData = [
    {
      name: "star",
      nameSingular: "Αστέρι",
      namePlural: "Αστέρια",
      img: "star-6-tinypng",
      text: "Για κάθε σωστή απάντηση, κερδίζεις 10 αστέρια!",
    },
    {
      name: "book",
      nameSingular: "Βιβλίο",
      namePlural: "Βιβλία",
      img: "book-completed-tinypng",
      text: "Αν απαντήσεις σωστά στο 60% των ερωτήσεων (3 στις 5 ή 6 στις 10), κερδίζεις ένα βιβλίο!",
    },
    {
      name: "silverMedal",
      nameSingular: "Ασημένιο Μετάλλιο",
      namePlural: "Ασημένια Μετάλλια",
      img: "silver-medal-tinypng",
      text: "Αν απαντήσεις σωστά στο 80% των ερωτήσεων (4 στις 5 ή 8 στις 10), κερδίζεις ένα ασημένιο μετάλλιο!",
    },
    {
      name: "goldMedal",
      nameSingular: "Χρυσό Μετάλλιο",
      namePlural: "Χρυσά Μετάλλια",
      img: "gold-medal-tinypng",
      text: "Αν απαντήσεις σωστά σε όλες τις ερωτήσεις, κερδίζεις ένα χρυσό μετάλλιο και παίρνεις επιπλέον 50 αστέρια!",
    },
    {
      name: "goldenRibbon",
      nameSingular: "Χρυσή Ροζέτα",
      namePlural: "Χρυσές Ροζέτες",
      img: "golden-ribbon-3-tinypng",
      text: "Συγκέντρωσε 1000 αστέρια και κέρδισε τουλάχιστον 1 χρυσό μετάλλιο για να ξεκλειδώσεις τη Χρυσή Ροζέτα!",
    },
  ];

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
        setUserAvatar(user?.user_metadata?.avatar);

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
    fetchUserQuizProgress();
  }, [loggedInUserData]);

  const fetchUserQuizProgress = async () => {
    if (!loggedInUserData?.id) return;

    const { data, error } = await supabase
      .from("user_lesson_progress")
      .select("*")
      .eq("user_id", loggedInUserData.id);

    if (error) {
      console.error("Error fetching quiz progress:", error);
      return;
    }

    setLoggedInUserQuizProgress(data);
  };

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
        userAvatar,
        setUserAvatar,
        loggedInUserData,
        loggedInUserQuizProgress,
        validationMessage,
        setValidationMessage,
        fetchUserQuizProgress,
        awardsData,
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
        loadingSpinner,
        setLoadingSpinner,
        displayedQuestionId,
        setDisplayedQuestionId,
        isMobile,
        isTablet,
        isDesktop,
        theme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const QuizContext = () => useContext(AppContext);
