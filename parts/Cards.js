import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/card.module.scss";

const cards = () => {
  const games = [
    {
      id: "1",
      name: "Addition",
      detail: "3 Levels",
      icon: "fas fa-plus",
      link: "select/addition",
    },
    {
      id: "2",
      name: "Subtraction",
      detail: "3 Levels",
      icon: "fas fa-minus",
      link: "select/subtraction",
    },
    {
      id: "3",
      name: "Multiplication",
      detail: "3 Levels",
      icon: "fas fa-times",
      link: "select/multiplication",
    },
    {
      id: "4",
      name: "Division",
      detail: "3 Levels",
      icon: "fas fa-divide",
      link: "select/division",
    },
    // {
    //   id: "5",
    //   name: "Rules",
    //   detail: "Information",
    //   icon: "fas fa-info-circle",
    //   link: "rules",
    // },
    // {
    //   id: "6",
    //   name: "Settings",
    //   detail: "Sound,Theme",
    //   icon: "fas fa-cog",
    //   link: "settings",
    // },
  ];
  const allCards = [];
  for (let i = 0; i < games.length; i++) {
    allCards.push(
      <Link to={games[i].link} className={styles.card}>
        <div className={styles.top}>
          <i className={games[i].icon}></i>
        </div>
        <h3 className={styles.name}>{games[i].name}</h3>
        <p className={styles.det}>{games[i].detail}</p>
      </Link>
    );
  }
  return <>{allCards}</>;
};

export default cards;
