import NavBar from "../components/navbar";

export default function Home({ games }) {
  return (
    <>
      <NavBar />
      <p>Home Page</p>
      <div>
        <ul>
          {games.map((game) => (
            <li key={game.id}>{game.title}</li>
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
