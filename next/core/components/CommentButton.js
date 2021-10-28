import styles from "./CommentButton.module.css";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { createAlert } from "../redux/alertSlice";

export default function CommentButton({
  game,
  setGameComments,
  setGameRating,
  setNumOfRating,
}) {
  /* Button for logged in users that can open a comment form to be submitted */

  const [csrfToken, setCsrfToken] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userID = useSelector((state) => state.user.userID);
  const gameID = game.id;

  const dispatch = useDispatch();

  //Load CSRF Token.
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

  //Create a button that appears when user is logged in and creates a comment form.
  let button;
  if (isLoggedIn) {
    button = (
      <button
        type="button"
        className={`btn btn-primary`}
        style={{ marginTop: "10px", marginLeft: "5px" }}
        onClick={() => setShowForm(!showForm)}
      >
        Add Post
      </button>
    );
  } else {
    button = null;
  }

  function displayForm() {
    /* Displays a form that allows user to post a comment and rate the game. */
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
              required
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
    /* Saves the comment and rating to the backend database. */

    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/add_comment/", {
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
    })
      .then((response) => response.json())
      //Update states to new values.
      .then((data) => {
        if (data.alert.type == "error") {
          console.log(data.alert.message);
        } else {
          setGameComments(data.game.comments);
          setGameRating(data.game.users_rating);
          setNumOfRating(data.game.num_of_rating);
          setShowForm(false);
        }
        dispatch(
          createAlert({
            type: data.alert.type,
            message: data.alert.message,
          })
        );
      });
  }

  if (!isLoggedIn) {
    //Hide button if the user is not logged in.
    return null;
  } else {
    return (
      <>
        {button}
        {showForm ? displayForm() : null}
      </>
    );
  }
}
