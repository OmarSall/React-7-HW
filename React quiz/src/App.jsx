import { useState } from "react"
import "./App.css"
import {QuizContextProvider} from "./context/QuizContextProvider.jsx";

function App() {

  return (
    <QuizContextProvider>
      <div className="App">
        <h1>Quiz</h1>
      </div>
    </QuizContextProvider>
  )
}

export default App
