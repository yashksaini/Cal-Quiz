import React, { useState } from "react";
import styles from "../styles/select.module.scss";
import { useParams, Link } from "react-router-dom";
const Select = () => {
  const [level, setLevel] = useState(1);
  const [questions, setQuestions] = useState(5);
  const { id } = useParams();
  let displayValue = "Addition";
  let icon;
  let type = "a";
  switch (id) {
    case "addition":
      displayValue = "Addition";
      icon = "fas fa-plus";
      type = "a";
      break;
    case "subtraction":
      displayValue = "Subtraction";
      icon = "fas fa-minus";
      type = "s";
      break;
    case "multiplication":
      displayValue = "Multiplication";
      icon = "fas fa-times";
      type = "m";
      break;
    case "division":
      displayValue = "Division";
      icon = "fas fa-divide";
      type = "d";
      break;
  }
  const levelChange = (value) => {
    setLevel(value);
  };
  const questionsChange = (value) => {
    setQuestions(value);
  };

  return (
    <div className={styles.selectBox}>
      <div className={styles.top}>
        <h1>
          {displayValue} <i className={icon}></i>
        </h1>
      </div>
      <div className={styles.body}>
        <h1>Select Level</h1>
        <div className={styles.group}>
          <div
            className={level === 1 ? `${styles.active}` : null}
            onClick={() => {
              levelChange(1);
            }}
          >
            1
          </div>
          <div
            className={level === 2 ? `${styles.active}` : null}
            onClick={() => {
              levelChange(2);
            }}
          >
            2
          </div>
          <div
            className={level === 3 ? `${styles.active}` : null}
            onClick={() => {
              levelChange(3);
            }}
          >
            3
          </div>
        </div>
        <h1>Number of Questions</h1>
        <div className={styles.group}>
          <div
            className={questions === 5 ? `${styles.active}` : null}
            onClick={() => {
              questionsChange(5);
            }}
          >
            5
          </div>
          <div
            className={questions === 10 ? `${styles.active}` : null}
            onClick={() => {
              questionsChange(10);
            }}
          >
            10
          </div>
          <div
            className={questions === 15 ? `${styles.active}` : null}
            onClick={() => {
              questionsChange(15);
            }}
          >
            15
          </div>
          <div
            className={questions === 20 ? `${styles.active}` : null}
            onClick={() => {
              questionsChange(20);
            }}
          >
            20
          </div>
        </div>
        <Link
          to={`/quiz/${type}&${level}&${questions}`}
          className={styles.start}
        >
          Start
        </Link>
      </div>
    </div>
  );
};

export default Select;
