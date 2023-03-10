import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./Quiz.css";
import Question from "../../components/Question/Question";
import { auth } from '../../firebase.js';

const Quiz = ({ questions, setQuestions, score, setScore }) => {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    setOptions(
      questions !== undefined &&
        handleShuffle([
          questions[currQues]?.correct_answer,
          ...questions[currQues]?.incorrect_answers,
        ])
    );
  }, [questions, currQues]);

  const handleShuffle = (optionsNew) => {
    return optionsNew.sort(() => Math.random() - 0.5);
  };

  return (
    <div className="quiz">
      <span className="subtitle">Hello, {auth.currentUser.displayName}</span>

      {questions ? (
        <>
          <div className="quizInfo">
            <span><b>{questions[currQues].category}</b></span>
            <span><b>Score : {score}</b></span>
          </div>

          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            setQuestions={setQuestions}
            correct={questions[currQues]?.correct_answer}
            options={options}
            score={score}
            setScore={setScore}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};

export default Quiz;
