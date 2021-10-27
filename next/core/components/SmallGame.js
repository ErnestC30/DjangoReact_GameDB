import styles from "./SmallGame.module.css";

export default function SmallGame({ game }) {
  /*Small Game Component to show games on user's profile pages. */

  const BACKEND_ROUTE = "http://127.0.0.1:8000";

  return (
    <div className={styles.col}>
      <div className={styles.padding}>
        <div className={styles.gameContainer}>
          <div className={styles.imageContainer}>
            <img
              src={BACKEND_ROUTE + game.thumbnail}
              alt="game thumbnail"
              className={styles.gameImage}
            />
          </div>
          <h1 className={styles.gameTitle}>{game.title}</h1>
        </div>
      </div>
    </div>
  );
}
