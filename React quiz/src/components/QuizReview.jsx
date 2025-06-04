import { useQuizContext } from "../context/useQuizContext";
import styles from "./QuizReview.module.css";
import he from "he";
import DOMPurify from "dompurify";
import {QUIZ_STATUSES} from "../constants/quizStatuses.js";

export function QuizReview() {
    const {
        userAnswers,
        score,
        questions,
        setStatus,
        resetAll,
        cumulativeScore,
    } = useQuizContext();


    return (
        <div className={styles.container}>
            <h2>Quiz Review</h2>
            <p>
                Score this round: {score} / {questions.length}
            </p>
            <p>
                Cumulative score: {cumulativeScore}
            </p>

            <ul className={styles.reviewList}>
                {userAnswers.map(({ question, selected, correct }, index) => {
                    const safeQuestion = DOMPurify.sanitize(he.decode(question));
                    const safeSelected = DOMPurify.sanitize(he.decode(selected || "No answer"));
                    const safeCorrect = DOMPurify.sanitize(he.decode(correct));
                    const isCorrect = selected === correct;

                    return (
                        <li
                            key={index}
                            className={`${styles.reviewItem} ${isCorrect ? styles.correct : styles.incorrect}`}
                        >
                            <div className={styles.question} dangerouslySetInnerHTML={{ __html: safeQuestion }} />
                            <p>
                                Your answer: <span dangerouslySetInnerHTML={{ __html: safeSelected }} />
                            </p>
                            {!isCorrect && (
                                <p>
                                    Correct answer: <span dangerouslySetInnerHTML={{ __html: safeCorrect }} />
                                </p>
                            )}
                        </li>
                    );
                })}
            </ul>

            <div className={styles.buttons}>
                <button onClick={() => setStatus(QUIZ_STATUSES.SETUP)} className={styles.restartButton}>
                    New Quiz
                </button>
                <button onClick={resetAll} className={styles.resetButton}>
                    Reset All Scores
                </button>
            </div>
        </div>
    );
}