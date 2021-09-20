export default function GameInfo({ game }) {
  return (
    <div className="game-container">
      <li>
        <p className="game-title">{game.title}</p>
        <p className="game-developer">{game.developer}</p>
        <p className="game-description">{game.description}</p>
        <p className="game-user-rating">User Rating: {game.users_rating}</p>
        <p className="game-num-user-rating">
          Users Votes: {game.num_of_rating}
        </p>
      </li>
    </div>
  );
}
