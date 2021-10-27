import SmallGame from "./SmallGame";
import Link from "next/link";

import { useEffect } from "react";
import { useState } from "react";

export default function ProfileLikes({ profile }) {
  /* Displays the list of games that the user has liked. */
  const profileLikes = profile.likes;
  const [gamesList, setGamesList] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get_user_likes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: profileLikes }),
    })
      .then((response) => response.json())
      .then((data) => {
        setGamesList(data["games_list"]);
      });
  }, []);

  return (
    <>
      <h1 style={{ color: "rgb(166, 168, 180)" }}>Favorited Games</h1>
      <div className="row row-cols-2 row-cols-sm-4 row-cols-md-6 row-cols-lg-8 buffer">
        {gamesList.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`}>
            <a className="small-game-href">
              <SmallGame game={game}></SmallGame>
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}
