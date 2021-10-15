import styles from "./Comment.module.css";

export default function Comment({ comment }) {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.imageContainer}></div>
      <div className={styles.textContainer}>
        <p>Hello</p>
      </div>
    </div>
  );
}
