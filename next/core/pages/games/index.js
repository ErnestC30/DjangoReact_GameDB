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

function getGamesList(games, searchQuery) {
  /* Returns the list of Game objects that contain search query values in either the game title or genres */

  //Split search query
  const searchQueryList = searchQuery.split(" ");

  const gamesList = !searchQuery
    ? games
    : games.filter((game) => {
        //Test if any of the search query values matches a game title or genre tag.
        let validQuery = searchQueryList.some((query) => {
          if (query.length == 0) {
            return false;
          } else {
            return (
              game.title.toLowerCase().includes(query) ||
              game.genres.some((genre) =>
                genre.name.toLowerCase().includes(query)
              )
            );
          }
        });
        return validQuery;
      });
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
