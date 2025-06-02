import { useQuizContext } from "../context/useQuizContext";
import { QuizSetupForm } from "./QuizSetupForm";
import { QuizQuestion } from "./QuizQuestion";
import { QuizReview } from "./QuizReview";
import { ScoreBoard } from "./ScoreBoard";
import { ResetButton } from "./ResetButton";

export default function Content() {
    const { status, error } = useQuizContext();

    return (
        <>
            {error && <div className="error">Error: {error}</div>}

            {!error && status === "setup" && <QuizSetupForm />}

            {!error && status === "inProgress" && (
                <>
                    <ScoreBoard />
                    <QuizQuestion />
                </>
            )}

            {!error && status === "review" && (
                <>
                    <QuizReview />
                    <ResetButton />
                </>
            )}
        </>
    );
}