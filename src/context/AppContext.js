const { createContext, useContext, useState, useEffect } = require("react");
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

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

  const [cookies, setCookie] = useCookies(["quizId"]);
  const [userData, setUserData] = useState(null);
  const [quizCategoriesData, setQuizCategoriesData] = useState([]);
  const [allQuizQuestions, setAllQuizQuestions] = useState([]);
  const [athenaeumQuestions, setAthenaeumQuestions] = useState([]);
  const [userInfo, setUserInfo] = useState([]);

  const router = useRouter();
  const { user, isSignedIn } = useUser();

  const allQuizCategories = [
    ...new Set(quizCategoriesData.map((quizCategory) => quizCategory.category)),
  ];

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("default_quiz_categories")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        setQuizCategoriesData(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("default_quiz_questions")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        setAllQuizQuestions(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("athenaeum").select("*");

      if (error) {
        console.error(error);
      } else {
        setAthenaeumQuestions(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("user_data").select("*");

      if (error) {
        console.error(error);
      } else {
        setUserInfo(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isSignedIn && user) {
      setUserData(user);
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    if (!selectedQuiz) {
      const cookieQuizId = cookies.quizId;
      if (cookieQuizId) {
        setSelectedQuizId(cookieQuizId);
      } else {
        router.push("/");
      }
    }
  }, [selectedQuiz]);

  useEffect(() => {
    if (selectedQuizId) {
      const foundQuiz = allQuizQuestions.filter(
        (q) => q.quiz_id === selectedQuizId
      );

      if (foundQuiz.length !== 0) {
        const quizTest = {
          quiz_id: foundQuiz[0].quiz_id,
          category: foundQuiz[0].category,
          subcategory: foundQuiz[0].subcategory,
          questions: foundQuiz.map((q) => ({
            id: q.question_id,
            title: q.question_title,
            question_img: q.question_img,
            availableAnswers: [q.answer_1, q.answer_2, q.answer_3, q.answer_4],
            correctAnswer: q.correct_answer,
          })),
        };
        setSelectedQuiz(quizTest);
      }

      setCookie("quizId", selectedQuizId, { path: "/" });
    }
  }, [selectedQuizId, allQuizQuestions]);

  return (
    <AppContext.Provider
      value={{
        quizCategoriesData,
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
