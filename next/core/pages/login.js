import { useState, useEffect } from "react";
import Router from "next/router";

export default function Login() {
  const [csrfToken, setCsrfToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/user/csrf/", {
      credentials: "include",
    })
      .then((res) => {
        let csrfToken = res.headers.get("X-CSRFToken");
        setCsrfToken(csrfToken);
        console.log(csrfToken);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmit(e) {
    //Can Add error checking here -> useState with error and display it underneath submit button for errors.
    e.preventDefault();
    fetch("http://localhost:8000/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not submit information.");
        }
      })
      .then((data) => {
        console.log(data);
        Router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="container-fluid" style={{ marginTop: 80 }}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label for="username" style={{ color: "#d6d6d6" }}>
              Username
            </label>
            <input
              style={{ maxWidth: "50vh" }}
              type="username"
              className="form-control"
              id="username"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="password" style={{ color: "#d6d6d6", marginTop: 5 }}>
              Password
            </label>
            <input
              style={{ maxWidth: "50vh" }}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: 10 }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
