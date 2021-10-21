import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createAlert } from "../redux/alertSlice";

export default function LikeButton({ game }) {
  const [csrfToken, setCsrfToken] = useState("");
  const userID = useSelector((state) => state.user.userID);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
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

  function handleClick(e) {
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
      .then((data) => console.log(data));
  }

  return isLoggedIn ? (
    <>
      <button
        type="button"
        className={`btn btn-primary`}
        style={{ marginTop: "10px", marginLeft: "5px" }}
        onClick={handleClick}
      >
        Like
      </button>
    </>
  ) : null;
}
