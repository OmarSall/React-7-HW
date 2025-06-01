import React from "react";
import { useQuizContext } from "../context/useQuizContext";
import styles from "./ScoreBoard.module.css";

export function ScoreBoard() {
    const { score, cumulativeScore } = useQuizContext();

    return (
        <div className={styles.scoreBoard}>
            <p>Current Score: <strong>{score}</strong></p>
            <p>Cumulative Score: <strong>{cumulativeScore}</strong></p>
        </div>
    );
}