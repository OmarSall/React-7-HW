import { useQuizContext } from "../context/useQuizContext";
import styles from "./ResetButton.module.css";

export function ResetButton() {
    const { resetAll } = useQuizContext();

    return (
        <button className={styles.resetButton} onClick={resetAll}>
            Restart Quiz
        </button>
    );
}