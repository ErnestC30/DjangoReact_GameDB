import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addUserLike, removeUserLike } from "../redux/userSlice";
import { createAlert } from "../redux/alertSlice";
import { useDispatch } from "react-redux";

export default function LikeButton({ game, setNumOfLikes }) {
  const dispatch = useDispatch();
  const [csrfToken, setCsrfToken] = useState("");
  const gameID = game.id;
  const userID = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userLikes = useSelector((state) => state.user.likes);

  function getButton() {
    /*Create a like or unlike button depending on if the user has already liked the game.*/
    let button;
    if (userLikes.includes(game.title)) {
      button = (
        <button
          type="button"
          className={`btn btn-danger`}
          style={{ marginTop: "10px", marginLeft: "5px" }}
          onClick={removeLike}
        >
          Unlike
        </button>
      );
    } else {
      button = (
        <button
          type="button"
          className={`btn btn-primary`}
          style={{ marginTop: "10px", marginLeft: "5px" }}
          onClick={addLike}
        >
          Like
        </button>
      );
    }
    return button;
  }

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

  function addLike(e) {
    e.preventDefault();
    /*Add the like to the backend db and redux store.*/
    fetch("http://127.0.0.1:8000/api/like_game/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        userID: userID,
        gameID: gameID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(addUserLike(data["gameTitle"]));
        dispatch(createAlert(data["alert"]));
        setNumOfLikes((game.num_of_likes += 1));
      });
  }

  function removeLike(e) {
    /*Remove the like from the backend db and redux store.*/
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/unlike_game/", {
      method: "POST",
      headers: {
        "Content-Type": "applications/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        userID: userID,
        gameID: gameID,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(removeUserLike(data["gameTitle"]));
        dispatch(createAlert(data["alert"]));
        setNumOfLikes((game.num_of_likes -= 1));
      });
  }

  return isLoggedIn ? <>{getButton()}</> : null;
}
