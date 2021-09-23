import Link from "next/link";

export default function NavBar() {
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
          </ul>
        </div>
      </nav>
    </>
  );
}
