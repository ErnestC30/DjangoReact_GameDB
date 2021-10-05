import { useSelector } from "react-redux";

export default function NavBar() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const username = useSelector((state) => state.user.username);

  if (isLoggedIn) {
    return (
      <>
        <nav className="navbar fixed-top navbar-expand navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="navbar-brand" href="">
              GamesDB
            </div>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/games">
                  Games
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href={`/profile/${username}`}>
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/logout">
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <>
        <nav className="navbar fixed-top navbar-expand navbar-dark bg-dark">
          <div className="container-fluid">
            <div className="navbar-brand" href="">
              GamesDB
            </div>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/login">
                  Log In
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="/login">
                  Register
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}
