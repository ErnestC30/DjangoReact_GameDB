import Game from "../../components/Game";
import SearchBar from "../../components/SearchBar";
import Link from "next/link";

import { useState } from "react";

export default function Games({ games }) {
  const [searchQuery, setSearchQuery] = useState("");
  /*Filter gamesList with the given search query */
  const gamesList = getGamesList(games, searchQuery);

  return (
    <>
      <div className="container-fluid games-list">
        <div className="row text-center">
          <h1 className="header">Games</h1>
          <SearchBar setSearchQuery={setSearchQuery} />
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 buffer">
          {gamesList.map((game) => (
            <Link key={game.id} href={`/games/${game.id}`}>
              <a className="game-href">
                <Game game={game}></Game>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

/* Returns the list of Game objects that contain the searchQuery substring in either the game title or genres */
function getGamesList(games, searchQuery) {
  const gamesList = !searchQuery
    ? games
    : games.filter(
        (game) =>
          game.title.toLowerCase().includes(searchQuery) ||
          game.genres.some((genre) =>
            genre.name.toLowerCase().includes(searchQuery)
          )
      );
  return gamesList;
}

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/games/");
  const games = await res.json();

  return {
    props: {
      games,
    },
  };
}
