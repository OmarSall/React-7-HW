import React from "react";
import styles from "./Timer.module.css";

export function Timer({ timeLeft, totalTime = 10 }) {

    const progressPercent = (timeLeft / totalTime) * 100;

    return (
        <div className={styles.timerContainer}>
            <div className={styles.timerLabel}>Time left: {timeLeft}s</div>
            <div className={styles.progressBar}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${progressPercent}%` }}
                />
            </div>
        </div>
    );
}
