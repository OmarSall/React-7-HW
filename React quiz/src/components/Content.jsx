import { useQuizContext } from "../context/useQuizContext";
import { QuizSetupForm } from "./QuizSetupForm";
import { QuizQuestion } from "./QuizQuestion";
import { QuizReview } from "./QuizReview";
import { ScoreBoard } from "./ScoreBoard";
import { ResetButton } from "./ResetButton";
import { QUIZ_STATUSES } from "../constants/quizStatuses";

export default function Content() {
    const { status, error } = useQuizContext();

    return (
        <>
            {error && <div className="error">Error: {error}</div>}

            {!error && status === QUIZ_STATUSES.SETUP && <QuizSetupForm />}

            {!error && status === QUIZ_STATUSES.IN_PROGRESS && (
                <>
                    <ScoreBoard />
                    <QuizQuestion />
                </>
            )}

            {!error && status === QUIZ_STATUSES.REVIEW && (
                <>
                    <QuizReview />
                    <ResetButton />
                </>
            )}
        </>
    );
}