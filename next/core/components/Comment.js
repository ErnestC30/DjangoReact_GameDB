import styles from "./Comment.module.css";

const BACKEND_ROUTE = "http://127.0.0.1:8000";

export default function Comment({ comment }) {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.infoContainer}>
        <img
          src={BACKEND_ROUTE + comment.author.image}
          alt="profile image"
          className={styles.profileImage}
        />
        <p className={styles.username}>{comment.author.user.username}</p>
        <p className={styles.rating}>
          The user rated the game: {comment.rating}
        </p>
      </div>
      <div className={styles.descriptionContainer}>
        <p>{comment.comment}</p>
      </div>
    </div>
  );
}
