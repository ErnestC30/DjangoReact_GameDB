import styles from "./CommentButton.module.css";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function CommentButton({ game }) {
  /* Button for logged in users that can open a comment form to be submitted */
  const [csrfToken, setCsrfToken] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userID = useSelector((state) => state.user.userID);
  const gameID = game.id;

  useEffect(() => {
    fetch("http://localhost:8000/user/csrf/", {
      credentials: "include",
    })
      .then((res) => {
        let csrfToken = res.headers.get("X-CSRFToken");
        setCsrfToken(csrfToken);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let button;
  if (isLoggedIn) {
    button = (
      <button
        type="button"
        className={`btn btn-primary`}
        style={{ marginTop: "5px" }}
        onClick={() => setShowForm(!showForm)}
      >
        Add Post
      </button>
    );
  } else {
    button = null;
  }

  //Displays form that allows user to post a comment (??? Give rating to game)
  function displayForm() {
    return (
      <>
        <form
          className={styles.formContainer}
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="rating" className={styles.text}>
              Rating
            </label>
            <select
              className={`form-select ${styles.rating}`}
              onChange={(e) => {
                setRating(e.target.value);
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
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "7px" }}
          >
            Submit
          </button>
        </form>
      </>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    //Info to send to backend : rating, comment, game id, user id
    console.log(`rating: ${rating}`);
    console.log(`comment: ${comment}`);
    fetch("http://127.0.0.1:8000/add_comment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        rating: rating,
        comment: comment,
        userID: userID,
        gameID: gameID,
      }),
    }).then((response) => response);
  }

  if (!isLoggedIn) {
    //Hide button if not logged in.
    return null;
  } else {
    return (
      <>
        {button}
        {showForm ? displayForm() : null}{" "}
      </>
    );
  }
}
