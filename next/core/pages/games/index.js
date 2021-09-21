import Game from "../../components/Game";

export default function Games({ games }) {
  return (
    <>
      <div className="container-fluid games-list">
        <div className="row text-center">
          <h1 className="header">Games</h1>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 buffer">
          {games.map((game) => (
            <Game key={game.id} game={game}></Game>
          ))}
        </div>
      </div>
      {/*
      <div className="container-fluid">
        <h1>Games Page</h1>
        <div className="games-list">
          <ul>
            {games.map((game) => (
              <GameInfo key={game.id} game={game}></GameInfo>
            ))}
          </ul>
        </div>
      </div>
    
    */}
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
