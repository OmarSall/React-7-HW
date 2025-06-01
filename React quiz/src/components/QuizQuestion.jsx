import {useEffect, useMemo, useState} from "react";
import {useQuizContext} from "../context/useQuizContext";
import styles from "./QuizQuestion.module.css";
import { shuffleArray } from "../functionalities/shuffleArray";
import he from "he"; // decoding HTML-encoded text from API
import DOMPurify from "dompurify";
import { Timer } from "./Timer";

export function QuizQuestion() {
    const {
        questions,
        currentIndex,
        setCurrentIndex,
        score,
        setScore,
        setUserAnswers,
        setStatus,
    } = useQuizContext();

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);

    const currentQuestion = questions[currentIndex];

    const allAnswers = useMemo(() => {
        const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
        return shuffleArray(answers);
    }, [currentQuestion]);

    const safeQuestionHTML = DOMPurify.sanitize(he.decode(currentQuestion.question));

    useEffect(() => {
        if (isAnswered) return;

        if (timeLeft === 0) {
            handleAnswer(null); // no-answer is treated like a false one
        }

        const timer = setTimeout(() => {
            setTimeLeft((currentTime) => currentTime - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, isAnswered]);

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
        setIsAnswered(true);

        const isCorrect = answer === currentQuestion.correct_answer;

        if (isCorrect) {
            setScore((prev) => prev + 1);
        }

        setUserAnswers((prev) => [
            ...prev,
            {
                question: currentQuestion.question,
                selected: answer,
                correct: currentQuestion.correct_answer,
            },
        ]);
    };

    const handleNext = () => {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            setStatus("review");
        }

        setSelectedAnswer(null);
        setIsAnswered(false);
        setTimeLeft(10);
    };

    return (
        <div className={styles.container}>
            <Timer timeLeft={timeLeft} totalTime={10} />

            <h2
                className={styles.question}
                dangerouslySetInnerHTML={{__html: safeQuestionHTML}}
            />

            <ul className={styles.answers}>
                {allAnswers.map((answer, index) => {
                    const safeAnswerHTML = DOMPurify.sanitize(he.decode(answer));
                    const isCorrect = answer === currentQuestion.correct_answer;
                    const isSelected = selectedAnswer === safeAnswerHTML;

                    return (
                        <li
                            key={answer}
                            className={`${styles.answer} 
                                ${isAnswered && isCorrect ? styles.correct : ""}
                                ${isAnswered && isSelected && !isCorrect ? styles.incorrect : ""}
                            `}
                            onClick={() => !isAnswered && handleAnswer(answer)}
                            dangerouslySetInnerHTML={{__html: safeAnswerHTML}}
                        />
                    );
                })}
            </ul>

            {isAnswered && (
                <button className={styles.nextButton} onClick={handleNext}>
                    {currentIndex + 1 < questions.length ? "Next" : "Finish Quiz"}
                </button>
            )}
        </div>
    );
}