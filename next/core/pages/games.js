import NavBar from "../components/navbar";

export default function Games({ games }) {
  return (
    <>
      <NavBar />
      <h1>Games Page</h1>
      <div>
        <ul>
          {games.map((game) => (
            <div className="game-container">
              <li key={game.id}>
                <p className="game-title">{game.title}</p>
                <p className="game-developer">{game.developer}</p>
                <p className="game-description">{game.description}</p>
                <p className="game-user-rating">
                  User Rating: {game.users_rating}
                </p>
                <p className="game-num-user-rating">
                  # Users Vote: {game.num_of_rating}
                </p>
              </li>
            </div>
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
