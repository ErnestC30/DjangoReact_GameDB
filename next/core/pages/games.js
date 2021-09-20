import GameInfo from "../components/game";

export default function Games({ games }) {
  return (
    <>
      <h1>Games Page</h1>
      <div className="games-list">
        <ul>
          {games.map((game) => (
            <GameInfo key={game.id} game={game}></GameInfo>
          ))}
        </ul>
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
