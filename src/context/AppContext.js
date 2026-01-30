const {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} = require("react");
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentInstitution, setCurrentInstitution] = useState(null);
  const [defaultSchoolLevels, setDefaultSchoolLevels] = useState([]);
  const [defaultGrades, setDefaultGrades] = useState([]);
  const [defaultLessons, setDefaultLessons] = useState([]);
  const [defaultQuestions, setDefaultQuestions] = useState([]);
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
  const [athenaeumCoursesData, setAthenaeumCoursesData] = useState([]);
  const [athenaeumQuestions, setAthenaeumQuestions] = useState([]);

  const router = useRouter();
  const { user, isSignedIn } = useUser();

  const allAthenaeumCourses = [
    ...new Set(
      athenaeumCoursesData.map((athenaeumGrade) => athenaeumGrade.course),
    ),
  ];

  const institutionsDataMap = {
    default: {
      schoolLevels: defaultSchoolLevels,
      grades: defaultGrades,
      lessons: defaultLessons,
      questions: defaultQuestions,
    },
    athenaeum: {
      schoolLevels: [],
      grades: [],
      lessons: [],
      questions: [],
    },
  };

  const currentInstitutionData = useMemo(() => {
    if (!currentInstitution) {
      return {
        schoolLevels: [],
        grades: [],
        lessons: [],
        questions: [],
      };
    }

    return (
      institutionsDataMap[currentInstitution] || {
        schoolLevels: [],
        grades: [],
        lessons: [],
        questions: [],
      }
    );
  }, [
    currentInstitution,
    defaultSchoolLevels,
    defaultGrades,
    defaultLessons,
    defaultQuestions,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("athenaeum_quiz_lessons")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        setAthenaeumCoursesData(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("athenaeum_quiz_questions")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        setAthenaeumQuestions(data);
      }
    };

    fetchData();
  }, []);

  //Test tables start

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("default_school_levels")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        setDefaultSchoolLevels(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("default_grades").select("*");

      if (error) {
        console.error(error);
      } else {
        setDefaultGrades(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("default_lessons")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        setDefaultLessons(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("default_questions")
        .select("*");

      if (error) {
        console.error(error);
      } else {
        setDefaultQuestions(data);
      }
    };

    fetchData();
  }, []);

  //Test tables end

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
    if (selectedQuizId && currentInstitutionData.questions.length > 0) {
      const foundQuiz = currentInstitutionData?.questions?.filter(
        (q) => q.lesson_id === selectedQuizId,
      );

      if (foundQuiz.length !== 0) {
        const quizTest = {
          quiz_id: foundQuiz[0].lesson_id,
          grade: foundQuiz[0].grade_name,
          lesson: foundQuiz[0].lesson_name,
          questions: foundQuiz.map((q) => ({
            id: q.sort_order,
            title: q.question,
            question_img: q.question_img,
            availableAnswers: [q.answer_1, q.answer_2, q.answer_3, q.answer_4],
            correctAnswer: q.correct_answer,
          })),
        };
        setSelectedQuiz(quizTest);
      }

      setCookie("quizId", selectedQuizId, { path: "/" });
    }
  }, [selectedQuizId, defaultQuestions]);

  return (
    <AppContext.Provider
      value={{
        currentInstitutionData,
        setCurrentInstitution,
        currentInstitution,
        allAthenaeumCourses,
        setSelectedQuizId,
        selectedQuiz,
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
