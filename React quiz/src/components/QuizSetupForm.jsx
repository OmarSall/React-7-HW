import {useState, useEffect, useCallback} from "react";
import {useQuizContext} from "../context/useQuizContext";
import styles from "./QuizSetupForm.module.css";

export function QuizSetupForm() {
    const {settings, setSettings, fetchQuestions, error} = useQuizContext();
    const [categories, setCategories] = useState([]);

    const getCategories = useCallback(async () => {
        try {
            const response = await fetch("https://opentdb.com/api_category.php");
            const data = await response.json();

            if (data && Array.isArray(data.trivia_categories)) {
                setCategories(data.trivia_categories);
            } else {
                console.error("Invalid categories data:", data);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }

    }, []);

    useEffect(() => {
        (async () => {
            await getCategories();
        })();
    }, [getCategories]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setSettings((prev) => ({
            ...prev,
            [name]: name === "amount" ? Number(value) : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchQuestions();
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label>
                Amount of questions:
                <input
                    type="number"
                    name="amount"
                    min="1"
                    max="50"
                    value={settings.amount}
                    onChange={handleChange}
                />
            </label>

            <label>
                Category:
                <select
                    name="category"
                    value={settings.category}
                    onChange={handleChange}
                >
                    <option value="">Any</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Difficulty:
                <select
                    name="difficulty"
                    value={settings.difficulty}
                    onChange={handleChange}
                >
                    <option value="">Any</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </label>

            <button type="submit">Start Quiz</button>

            {error && <p className={styles.error}>Error: {error}</p>}
        </form>
    );
}