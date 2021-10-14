//Stuff to add: GameInfo, Comment Section, Rating Option
import GameInfo from "../../components/GameInfo";
import CommentButton from "../../components/CommentButton";

export default function GamePage({ game }) {
  /* Page that displays an individual game and allows users to rate and comment on the game */

  return (
    <>
      <div className="container-fluid games-list">
        <div className="header"></div>
        <GameInfo game={game} />
        <CommentButton game={game} />
      </div>
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
  //Return the Game and list of Comments associated with the game id
  const id = context.params.id;
  const res = await fetch(`http://127.0.0.1:8000/games/${id}`);
  const data = await res.json();
  console.log(data);

  return {
    props: { game: data },
  };
}
1;
