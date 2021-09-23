import styles from "./GameInfo.module.css";

export default function GameInfo({ game }) {
  return (
    <div className={styles.gameInfoContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.gameImage} src={game.image} />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.gameTitle}>{game.title}</p>
        <p className={styles.developer}>{game.developer}</p>
        <p className={styles.description}>{game.description}</p>
        <p className={styles.rating}>
          Average Users Rating: {game.users_rating}
        </p>
        <p className={styles.numOfRating}>
          # of User Ratings: {game.num_of_rating}
        </p>
        <p className={styles.userLikes}>{game.likes}</p>
        {/*<p className={styles.genres}>{game.genres}</p>*/}
      </div>
    </div>
  );
}
