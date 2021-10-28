import GameInfo from "../../components/GameInfo";
import CommentButton from "../../components/CommentButton";
import Comment from "../../components/Comment";

import { useState } from "react";

export default function GamePage({ game }) {
  /* Page that displays an individual game and allows users to rate and comment on the game */

  //Update rating stats when a comment is posted.
  const [gameRating, setGameRating] = useState(game.users_rating);
  const [numOfRating, setNumOfRating] = useState(game.num_of_rating);
  //Store all comments associated with this game in a state.
  const [gameComments, setGameComments] = useState(game.comments);

  return (
    <>
      <div className="container-fluid">
        <GameInfo
          game={game}
          gameRating={gameRating}
          numOfRating={numOfRating}
        />
        <CommentButton
          game={game}
          setGameComments={setGameComments}
          setGameRating={setGameRating}
          setNumOfRating={setNumOfRating}
        />
        <div className="flex-comment-container">
          {gameComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              gameComments={gameComments}
              setGameComments={setGameComments}
              setGameRating={setGameRating}
              setNumOfRating={setNumOfRating}
            />
          ))}
        </div>
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

  return {
    props: { game: data },
  };
}
1;
