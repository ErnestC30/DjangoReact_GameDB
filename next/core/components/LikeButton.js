import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addUserLike } from "../redux/userSlice";
import { createAlert } from "../redux/alertSlice";
import { useDispatch } from "react-redux";

export default function LikeButton({ game, setNumOfLikes }) {
  const [csrfToken, setCsrfToken] = useState("");
  const userID = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userLikes = useSelector((state) => state.user.likes);
  const gameID = game.id;
  const dispatch = useDispatch();
  const test = useSelector((state) => console.log(state));

  //Display a like or unlike button depending if user has already liked the game.
  function getButton() {
    let button;
    if (userLikes.includes(game.title)) {
      console.log("user has liked");
      button = (
        <button
          type="button"
          className={`btn btn-danger`}
          style={{ marginTop: "10px", marginLeft: "5px" }}
          onClick={addLike}
        >
          Unlike
        </button>
      );
    } else {
      console.log("user has not liked");
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
    //fetch request to store into games.likes
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
        console.log(data);
        console.log(data["gameTitle"]);
        dispatch(addUserLike(data["gameTitle"]));
        setNumOfLikes((game.num_of_likes += 1));
      });
  }

  function removeLike(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/unlike_game", {
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
        console.log(data);
        //dispatch to remove like and set num of likes -= 1
      });
  }

  return isLoggedIn ? <>{getButton()}</> : null;
}
