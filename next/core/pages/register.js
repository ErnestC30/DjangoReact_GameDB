import { useState, useEffect } from "react";

export default function register() {
  const [csrfToken, setCsrfToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/user/csrf/", {
      credentials: "include",
    })
      .then((res) => {
        let csrfToken = res.headers.get("X-CSRFToken");
        setCsrfToken(csrfToken);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const isValidForm = true;
    if (!username || !email || !password || !passwordConfirm) {
      console.log("all fields must be filled out.");
      isValidForm = false;
    }
    if (password !== passwordConfirm) {
      console.log("passwords must be identical");
      isValidForm = false;
    }

    fetch("http://localhost:8000/user/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <>
      <div className="container-fluid" style={{ marginTop: 80 }}>
        <h1 style={{ color: "#d6d6d6" }}>Register </h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginTop: "10px" }}>
            <label htmlFor="username" style={{ color: "#d6d6d6" }}>
              Username
            </label>
            <input
              style={{ maxWidth: "50vh" }}
              className="form-control"
              id="username"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginTop: "10px" }}>
            <label htmlFor="email" style={{ color: "#d6d6d6" }}>
              Email
            </label>
            <input
              style={{ maxWidth: "50vh" }}
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginTop: "10px" }}>
            <label htmlFor="password" style={{ color: "#d6d6d6" }}>
              Password
            </label>
            <input
              style={{ maxWidth: "50vh" }}
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginTop: "10px" }}>
            <label htmlFor="passwordConfirm" style={{ color: "#d6d6d6" }}>
              Confirm Password
            </label>
            <input
              style={{ maxWidth: "50vh" }}
              type="password"
              className="form-control"
              id="passwordConfirm"
              placeholder="Confirm Password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "20px" }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
