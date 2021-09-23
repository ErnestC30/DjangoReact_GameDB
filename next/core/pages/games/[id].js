//Stuff to add: GameInfo, Comment Section, Rating Option
import GameInfo from "../../components/GameInfo";

export default function GamePage({ game }) {
  return (
    <>
      <GameInfo game={game} />;
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://127.0.0.1:8000/games/");
  const games = await res.json();
  const paths = games.map((game) => {
    return {
      params: { id: game.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch(`http://127.0.0.1:8000/games/${id}`);
  const data = await res.json();

  return {
    props: { game: data },
  };
}
