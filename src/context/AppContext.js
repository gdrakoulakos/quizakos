const { createContext, useContext, useState, useEffect } = require("react");
import allQuizzes from "../data/quizzesData.json";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [displayedQuestionIndex, setDisplayedQuestionIndex] = useState(0);
  const [showPopUpResults, setShowPopUpResults] = useState(false);
  const [clickedAnswersResults, setClickedAnswersResults] = useState({
    correctAnswers: 0,
    incorrectAnswers: 0,
    totalAnswers: 0,
    incorrectAnswersData: [],
  });
  const allQuizCategories = [
    ...new Set(allQuizzes.map((item) => item.category)),
  ];
  const [cookies, setCookie] = useCookies(["quizId"]);
  const [userData, setUserData] = useState(null);

  const router = useRouter();
  const { user, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      setUserData(user);
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    if (!selectedQuizId) {
      const cookieQuizId = cookies.quizId;
      if (cookieQuizId) {
        setSelectedQuizId(cookieQuizId);
      } else {
        router.push("/");
      }
      return;
    }
    if (selectedQuizId) {
      const foundQuiz = allQuizzes.find((q) => q.id === selectedQuizId);

      setSelectedQuiz(foundQuiz);
      setCookie("quizId", selectedQuizId, { path: "/" });
    }
  }, [selectedQuizId]);

  return (
    <AppContext.Provider
      value={{
        allQuizzes,
        setSelectedQuizId,
        selectedQuiz,
        allQuizCategories,
        displayedQuestionIndex,
        setDisplayedQuestionIndex,
        clickedAnswersResults,
        setClickedAnswersResults,
        showPopUpResults,
        setShowPopUpResults,
        userData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const QuizContext = () => useContext(AppContext);
