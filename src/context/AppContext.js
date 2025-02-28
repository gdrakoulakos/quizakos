const { createContext, useContext, useState } = require("react");
import notationAndStructure from "../data/quizQuestions/theory/notationAndStructure";
import chordsAndHarmony from "../data/quizQuestions/theory/chordsAndHarmony";
import baroqueAndClassicalEras from "../data/quizQuestions/history/baroqueAndClassicalEras";
import romanticAndModernEras from "../data/quizQuestions/history/romanticAndModernEras";

const allQuizData = {
  notationAndStructure: notationAndStructure,
  chordsAndHarmony: chordsAndHarmony,
  baroqueAndClassicalEras: baroqueAndClassicalEras,
  romanticAndModernEras: romanticAndModernEras,
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [category, setCategory] = useState("");

  const quizData = allQuizData[category];

  return (
    <AppContext.Provider value={{ category, setCategory, quizData }}>
      {children}
    </AppContext.Provider>
  );
};

export const QuizContext = () => useContext(AppContext);
