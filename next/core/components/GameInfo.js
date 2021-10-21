import styles from "./GameInfo.module.css";
import LikeButton from "./LikeButton";

export default function GameInfo({ game, gameRating, numOfRating }) {
  /*Component to display detailed individual game information */

  return (
    <div className={styles.gameInfoContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.gameImage} src={game.image} />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.gameTitle}>{game.title}</p>
        <p className={styles.developer}>{game.developer}</p>
        <p className={styles.description}>{game.description}</p>
        <div className={styles.genres}>
          Genres:
          {game.genres.map((genre) => (
            <span key={genre.name} className={styles.genreType}>
              {genre.name}
            </span>
          ))}
        </div>
        <p className={styles.rating}>
          Average Users Rating: {gameRating}
          <span className={styles.numOfRating}>
            # of User Ratings: {numOfRating}
          </span>
        </p>
        <p className={styles.userLikes}>{game.likes}</p>
        <div className={styles.likeButton}>
          <LikeButton game={game} />
        </div>
      </div>
    </div>
  );
}
