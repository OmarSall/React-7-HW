import "./App.css"
import {QuizContextProvider} from "./context/QuizContextProvider.jsx";
import {useQuizContext} from "./context/useQuizContext";
import Content from "./components/Content";

function App() {
    return (
        <QuizContextProvider>
            <div className="App">
                <h1>Quiz</h1>
                <Content />
            </div>
        </QuizContextProvider>
    )
}

export default App