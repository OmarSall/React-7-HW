import {useState} from "react";
import {QuizContext} from "./QuizContext";
import { QUIZ_STATUSES } from "../constants/quizStatuses";

export const QuizContextProvider = ({children}) => {
    const [settings, setSettings] = useState({ amount: 5, category: "", difficulty: "" });
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [cumulativeScore, setCumulativeScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [status, setStatus] = useState(QUIZ_STATUSES.SETUP); // setup | inProgress | review
    const [error, setError] = useState(null);

    const saveCumulativeScore = (score) => {
        setCumulativeScore((prev) => prev + score);
    };

    const fetchQuestions = async () => {
        try {
            const {amount, category, difficulty} = settings;

            const params = new URLSearchParams({
                amount,
                type: "multiple"
            });
            
            if (category) {
                params.append("category", category);
            }
            if (difficulty) {
                params.append("difficulty", difficulty);
            }

            const url = `https://opentdb.com/api.php?${params.toString()}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Network response was not ok (${response.status})`);
            }

            const data = await response.json();
            if (!data.results || data.results.length === 0) {
                throw new Error("No questions found for the given settings.");
            }
            setQuestions(data.results);
            setCurrentIndex(0);
            setScore(0);
            setUserAnswers([]);
            setStatus(QUIZ_STATUSES.IN_PROGRESS);
        } catch (error) {
            console.error("Error fetching quiz questions:", error);
            setError(error.message);
        }
    };

    const resetAll = () => {
        setCumulativeScore(0);
        setSettings({ amount: 5, category: "", difficulty: "" });
        setStatus(QUIZ_STATUSES.SETUP);
        setError(null);
    };

    return (
        <QuizContext.Provider
            value={{
                settings,
                setSettings,
                questions,
                currentIndex,
                setCurrentIndex,
                score,
                setScore,
                cumulativeScore,
                setCumulativeScore,
                userAnswers,
                setUserAnswers,
                fetchQuestions,
                resetAll,
                status,
                setStatus,
                saveCumulativeScore,
                error
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}