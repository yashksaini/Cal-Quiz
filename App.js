import Cards from "./parts/Cards";
import styles from "./styles/app.module.scss";
function App() {
  return (
    <div className={styles.App}>
      <div className={styles.name}>CalQuiz</div>
      <div className={styles.selection_box}>
        <Cards />
      </div>
      <p className={styles.footer}>
        <a target="_blank" href="https://yashksportfolio.netlify.app/about">
          {" "}
          Yash Kumar Saini
        </a>
        @2022
      </p>
      {/* <div className={styles.share}>
        <i className="fas fa-graduation-cap"></i>
      </div> */}
    </div>
  );
}

export default App;
