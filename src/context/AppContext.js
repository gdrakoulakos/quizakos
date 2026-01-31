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
  const [defaultQuizData, setDefaultQuizData] = useState([]);
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
    default: defaultQuizData,
    athenaeum: [],
  };

  const currentInstitutionData = institutionsDataMap[currentInstitution] || [];

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
    const fetchAllData = async () => {
      try {
        const { data, error } = await supabase.from("default_school_levels")
          .select(`
          id,
          level_name,
          grades:default_grades (
            id,
            grade_name,
            school_level_id,
            lessons:default_lessons (
              id,
              lesson_name,
              quiz_description,
              imgCard,
              grade_id,
              questions:default_questions (
                id,
                lesson_id,
                sort_order,
                question,
                answer_1,
                answer_2,
                answer_3,
                answer_4,
                correct_answer,
                question_img
              )
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

    fetchAllData();
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
        setSelectedQuizId(null);
      } else {
        router.push("/");
      }
    }
  }, [selectedQuiz]);

  useEffect(() => {
    if (selectedQuizId && defaultQuestions.length > 0) {
      const foundQuizQuestions = defaultQuestions.filter(
        (q) => q.lesson_id === selectedQuizId,
      );
      const foundLesson = defaultLessons.find(
        (lesson) => lesson.id === selectedQuizId,
      );
      const lessonName = foundLesson.lesson_name;

      const lessonGrade = defaultGrades.find(
        (grade) => grade.id === foundLesson.grade_id,
      );
      const gradeName = lessonGrade.grade_name;

      if (foundQuizQuestions.length !== 0) {
        const quizTest = {
          quiz_id: selectedQuizId,
          grade: gradeName,
          lesson: lessonName,
          questions: foundQuizQuestions.map((q) => ({
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
