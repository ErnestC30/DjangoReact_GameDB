/*Component for each game display on pages/games/index */
export default function Game({ game }) {
  return (
    <div className="col">
      <div className="padding">
        <div className="game-container">
          <div className="image-container">
            <img
              src={game.thumbnail}
              alt="game thumbnail"
              className="game-image"
            />
          </div>
          <h1 className="game-title">{game.title}</h1>
          <p className="game-developer">{game.developer}</p>
          <p className="game-user-rating">Users Rating: {game.users_rating}</p>
        </div>
      </div>
    </div>
  );
}
