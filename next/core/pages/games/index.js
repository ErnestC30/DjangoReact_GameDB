import Game from "../../components/Game";
import Link from "next/link";

export default function Games({ games }) {
  return (
    <>
      <div className="container-fluid games-list">
        <div className="row text-center">
          <h1 className="header">Games</h1>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 buffer">
          {games.map((game) => (
            <Link href={`/games/${game.id}`} key={game.id}>
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

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/games/");
  const games = await res.json();

  return {
    props: {
      games,
    },
  };
}
