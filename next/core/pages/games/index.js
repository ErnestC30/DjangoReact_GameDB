import Game from "../../components/Game";
import SearchBar from "../../components/SearchBar";
import Link from "next/link";

import { useState } from "react";

export default function Games({ games }) {
  /* Page that displays all games in the database */

  //Filter gamesList with the given search query
  const [searchQuery, setSearchQuery] = useState("");
  const gamesList = getGamesList(games, searchQuery);

  return (
    <>
      <div className="container-fluid">
        <div className="row header">
          <h1 className="header-title">Games</h1>
          <div className="search-bar">
            <SearchBar setSearchQuery={setSearchQuery} />
          </div>
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
/*OPTIONAL: LET USER SEARCH FOR MULTIPLE TAGS -> PARSE SPACES INTO SEPARATE SEARCH QUERY */
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
