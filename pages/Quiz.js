import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/quiz.module.scss";

let question_list = [];
let answers = [];
let correct_ans = [];
let ans_status = [];
let totalTime;
let current_que = 1;
const showResult = [];
const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [corrects, setCorrects] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [notAttempted, setNotAttempted] = useState(0);
  let special;

  const { id } = useParams();
  const paramerter = id.split("&");
  const type = paramerter[0];
  const level = paramerter[1];
  const questions = paramerter[2];
  const [next_text, setNext_text] = useState("Next");
  let symbol = "+";
  let max = Math.pow(10, level);
  let min = Math.pow(10, level - 1);

  let max1 = Math.pow(10, level);
  let min1 = Math.pow(10, level - 1);
  switch (type) {
    case "a":
      symbol = "+";
      max = Math.pow(10, level);
      min = Math.pow(10, level - 1);
      break;
    case "s":
      symbol = "-";
      max = Math.pow(10, level);
      min = Math.pow(10, level - 1);
      break;
    case "m":
      symbol = "X";
      max = Math.pow(10, level);
      min = Math.pow(10, level - 1);

      max1 = Math.pow(2, parseInt(level) + parseInt(2));
      min1 = Math.pow(2, 1);
      break;
    case "d":
      max = Math.pow(10, level);
      min = Math.pow(10, level - 1);

      max1 = Math.pow(2, parseInt(level) + parseInt(2));
      min1 = Math.pow(2, 1);
      symbol = "÷";
      special = "Quotient";
      break;
  }

  const refresh = () => {
    question_list.length = 0;
    answers.length = 0;
    correct_ans.length = 0;
    ans_status.length = 0;
  };
  const result = () => {
    let correct_count = 0;
    let wrong_count = 0;
    let na = 0;
    ans_status.length = 0;
    for (let i = 0; i < questions; i++) {
      if (answers[i] == correct_ans[i] && answers[i]) {
        correct_count++;
        ans_status.push(2);
      } else if (answers[i] != correct_ans[i] && answers[i]) {
        wrong_count++;
        ans_status.push(1);
      } else {
        na++;
        ans_status.push(0);
      }
    }
    setCorrects(correct_count);
    setWrongs(wrong_count);
    setNotAttempted(na);

    showResult.length = 0;
    let a = [];
    for (let i = 0; i < questions; i++) {
      let show_ans = answers[i];
      if (!answers[i]) {
        show_ans = "N/A";
      }
      a.length = 0;
      let b;
      if (ans_status[i] === 2) {
        a.push(
          <span className={styles.correct}>
            <i className="far fa-check-circle"></i>
          </span>
        );
        b = "#0ca420";
      } else if (ans_status[i] === 1) {
        a.push(
          <span className={styles.incorrect}>
            <i className="far fa-times-circle"></i>
          </span>
        );
        b = "#e24226";
      } else if (ans_status[i] === 0) {
        a.push(
          <span className={styles.notAttempted}>
            <i className="fas fa-exclamation-triangle"></i>
          </span>
        );
        b = "#8c8c85";
      }
      showResult.push(
        <div className={styles.ans_card}>
          <div className={styles.que_top}>
            <div className={styles.number} style={{ backgroundColor: b }}>
              {i + 1}
            </div>
            <div className={styles.showQue}>
              {question_list[i].num1} {symbol} {question_list[i].num2}
              {a[0]}
            </div>
          </div>

          <p className={styles.user_answer} style={{ color: b }}>
            Your Answer <span style={{ color: b }}>{show_ans}</span>
          </p>
          <p className={styles.correct_answer}>
            Correct Answer <span>{question_list[i].answer}</span>
          </p>
          <div className={styles.line1}></div>
        </div>
      );
    }
  };

  const allQuestion = () => {
    for (let i = 0; i < questions; i++) {
      let a = Math.floor(Math.random() * (max - min + 1)) + min;
      let b = Math.floor(Math.random() * (max1 - min1 + 1)) + min1;
      question_list.push({});
      let c;
      if (a >= b) {
        question_list[i].num1 = a;
        question_list[i].num2 = b;
      } else {
        question_list[i].num2 = a;
        question_list[i].num1 = b;
      }
      switch (type) {
        case "a":
          c = a + b;
          break;
        case "s":
          c = Math.abs(a - b);
          break;
        case "m":
          c = a * b;
          break;
        case "d":
          if (a >= b) {
            c = Math.floor(a / b);
          } else {
            c = Math.floor(b / a);
          }

          break;
      }
      question_list[i].q_no = i + 1;
      question_list[i].answer = c;
      question_list[i].q_type = "Addition";
      correct_ans.push(question_list[i].answer);
    }
    next();
  };

  const next = () => {
    let a = current + parseInt(1);
    if (current === questions - 1) {
      setNext_text("Submit");
    }
    if (current > 0 && current <= questions) {
      answers.push(input);
    }
    setInput("");
    if (current < questions) {
      setValue1(question_list[current].num1);
      setValue2(question_list[current].num2);
      setCurrent(a);
    } else if (current == questions) {
      setCurrent(parseInt(questions) + 1);
      result();
    }
  };
  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };
  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      next();
    }
  };
  const increaseTime = () => {
    if (current_que <= parseInt(questions)) {
      setSeconds((seconds) => seconds + 1);
    } else {
      clearInterval(totalTime);
    }
  };

  const checkValid = () => {
    if (
      paramerter.length !== 3 ||
      parseInt(paramerter[1]) > 4 ||
      parseInt(paramerter[2]) > 21
    ) {
      window.location.href = "/";
    } else if (
      paramerter[0] !== "a" ||
      paramerter[0] !== "s" ||
      paramerter[0] !== "m" ||
      paramerter[0] !== "d"
    ) {
      paramerter[0] = "a";
    }
  };
  useEffect(() => {
    totalTime = setInterval(increaseTime, 1000);
    refresh();
    allQuestion();
    result();
    checkValid();
  }, []);

  useEffect(() => {
    current_que = current;
  }, [current]);

  return (
    <div>
      <div
        className={
          current > questions ? `${styles.deactive}` : `${styles.card}`
        }
      >
        <div className={styles.level}>Level - {level}</div>
        <h1 className={styles.time}>
          <i className="fas fa-stopwatch"></i> {seconds}s
        </h1>
        <div className={styles.question}>
          <div className={styles.q_no}>{current}</div>
          <h1>Calculate {special}</h1>
          <p>
            {value1} {symbol} {value2}
          </p>
          <input
            type="number"
            placeholder="Enter Answer"
            className={styles.input}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            value={input}
          ></input>
          <button className={styles.next} onClick={next}>
            {next_text}
          </button>
        </div>
        <h1 className={styles.q_stats}>
          {current} of {questions}
        </h1>
      </div>
      <div
        className={
          current > questions ? `${styles.card}` : `${styles.deactive}`
        }
      >
        <h1 className={styles.time}>
          <i className="fas fa-stopwatch"></i> {seconds}s
        </h1>
        <div className={styles.result}>
          <h1>Result</h1>
          <div className={`${styles.rtype} ${styles.total}`}>
            <span>
              <b>Level - {level}</b>
            </span>
            <span>{questions}</span>
          </div>
          <div className={styles.line}></div>
          <div className={`${styles.rtype} ${styles.correct}`}>
            <span>Correct </span> <span>{corrects}</span>
          </div>
          <div className={`${styles.rtype} ${styles.incorrect}`}>
            <span>Incorrect </span>
            <span>{wrongs}</span>
          </div>
          <div className={`${styles.rtype} ${styles.notAttempted}`}>
            <span>Not Attempted </span>
            <span>{notAttempted}</span>
          </div>

          <br />
          <a href="/" className={styles.again}>
            Play Again
          </a>
        </div>
        <div className={styles.result}>{showResult}</div>
      </div>
    </div>
  );
};

export default Quiz;
