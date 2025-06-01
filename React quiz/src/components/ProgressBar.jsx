import React from "react";
import { useQuizContext } from "../context/useQuizContext";
import styles from "./ProgressBar.module.css";

export function ProgressBar() {
    const { currentIndex, questions } = useQuizContext();
    const progressPercent = questions.length
        ? ((currentIndex) / questions.length) * 100
        : 0;

    return (
        <div className={styles.progressBarContainer}>
            <div
                className={styles.progressBarFill}
                style={{ width: `${progressPercent}%` }}
            />
        </div>
    );
}