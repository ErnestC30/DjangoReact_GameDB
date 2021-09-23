export default function GameInfo({ game }) {
  return (
    <div className="game-info-container">
      <p className="game-image">{game.image}</p>
      <p className="game-title">{game.title}</p>
      <p className="game-description">{game.description}</p>
      <p className="game-developer">{game.developer}</p>
      <p className="users-rating">{game.users_rating}</p>
      <p className="num-of-users-rating">{game.num_of_rating}</p>
      <p className="user-likes">{game.likes}</p>
      <p className="genres">{game.genres}</p>
    </div>
  );
}
