import { useSelector } from "react-redux";

export default function Home() {
  /* Home page and introduction */
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const username = useSelector((state) => state.user.username);

  return isLoggedIn ? (
    <>
      <div className="container-fluid">
        <div className="introduction">
          <h1>Welcome to GamesDB</h1>
          <p>Hello {username}</p>
          <p>
            Go to the{" "}
            <a href="/games/" className="home-link">
              Games Page
            </a>{" "}
            to start looking at games. Here you view games in detail and rate,
            comment, or like any games.
          </p>
          <p>
            Go to the{" "}
            <a href="/profile/" className="home-link">
              Profile Page
            </a>{" "}
            to edit your profile.
          </p>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="container-fluid">
        <div className="introduction">
          <h1>Welcome to GamesDB</h1>
          <p>
            Go to the{" "}
            <a href="/register" className="home-link">
              Register Page
            </a>{" "}
            to create an account and start rating and commenting on games.
          </p>
          <p>
            Already have an account? Go to the{" "}
            <a href="/login" className="home-link">
              Login Page
            </a>{" "}
            to login.
          </p>
          <p>
            Go to the{" "}
            <a href="/games/" className="home-link">
              Games Page
            </a>{" "}
            to start looking at games. Logging in is required to rate and
            comment on the games.
          </p>
        </div>
      </div>
    </>
  );
}
