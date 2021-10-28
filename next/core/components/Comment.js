import styles from "./Comment.module.css";
import Link from "next/link";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createAlert } from "../redux/alertSlice";

const BACKEND_ROUTE = "http://127.0.0.1:8000";

export default function Comment({
  comment,
  gameComments,
  setGameComments,
  setGameRating,
  setNumOfRating,
}) {
  /* Create display for each individual comment. */

  const [commentContent, setCommentContent] = useState(comment.comment);
  const [commentRating, setCommentRating] = useState(comment.rating);
  const [isEditing, setIsEditing] = useState(false);
  const userID = useSelector((state) => state.user.userID);
  const dispatch = useDispatch();

  //Creates a Delete and Edit button for a logged in user's comment.
  let buttons =
    userID == comment.author.user_id ? (
      <div className={styles.editButtons}>
        <button
          type="button"
          className={`btn btn-sm btn-warning`}
          style={{
            bottom: "5px",
            right: "70px",
            position: "absolute",
            width: "60px",
            color: "rgb(100)",
          }}
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          type="button"
          className={`btn btn-sm btn-danger`}
          style={{
            bottom: "5px",
            right: "5px",
            position: "absolute",
            width: "60px",
            color: "rgb(100)",
          }}
          onClick={() => deleteComment(comment)}
        >
          Delete
        </button>
      </div>
    ) : null;

  function deleteComment(comment) {
    /* Deletes the comment and updates the game comments list. */

    fetch("http://127.0.0.1:8000/api/delete_comment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment.id),
    })
      .then((response) => response.json())
      .then((data) => {
        //Remove the deleted comment from comments list and update rating states.
        setGameComments(
          gameComments.filter((comment) => comment.id !== data.commentID)
        );
        setGameRating(data.game.users_rating);
        setNumOfRating(data.game.num_of_rating);
        dispatch(
          createAlert({ type: data.alert.type, message: data.alert.message })
        );
      });
  }

  function editComment(e) {
    /* Edits the comment and updates the Game rating. */
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/edit_comment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newRating: commentRating,
        oldRating: comment.rating,
        comment: commentContent,
        commentID: comment.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCommentContent(data.commentContent);
        setCommentRating(data.commentRating);
        setGameRating(data.game.users_rating);
        setIsEditing(false);
        dispatch(
          createAlert({ type: data.alert.type, message: data.alert.message })
        );
      });
  }

  //Creates an edit form if the user is editing a comment.
  return isEditing ? (
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
      </div>
      <div className={styles.editContainer}>
        <form
          className={styles.formContainer}
          method="post"
          onSubmit={editComment}
        >
          <div className="form-group">
            <label htmlFor="rating" className={styles.text}>
              Rating
            </label>
            <select
              className={`form-select ${styles.editRating}`}
              required
              onChange={(e) => {
                setCommentRating(e.target.value);
              }}
            >
              <option disabled selected value="">
                Rate the game
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="comment" className={styles.text}>
              Comment
            </label>
            <textarea
              required
              className="form-control"
              id="comment"
              rows="5"
              onChange={(e) => setCommentContent(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "7px" }}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-warning"
            style={{ marginTop: "7px", marginLeft: "7px", color: "rgb(100)" }}
            onClick={() => {
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  ) : (
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
          The user rated the game: {commentRating}
        </p>
      </div>
      <div className={styles.descriptionContainer}>
        <p>{commentContent}</p>
      </div>
      {buttons}
    </div>
  );
}
