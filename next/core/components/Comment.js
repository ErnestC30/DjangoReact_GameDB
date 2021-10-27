import styles from "./Comment.module.css";
import Link from "next/link";

const BACKEND_ROUTE = "http://127.0.0.1:8000";

export default function Comment({ comment }) {
  /* Create display for each individual comment. */
  return (
    <div className={styles.commentContainer}>
      <div className={styles.infoContainer}>
        <img
          src={BACKEND_ROUTE + comment.author.image}
          alt="profile image"
          className={styles.profileImage}
        />
        <Link href={`/profile/${comment.author.user.username}/`}>
          <a className={styles.username}>{comment.author.user.username}</a>
        </Link>
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
