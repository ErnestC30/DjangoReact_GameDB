import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUserInfo } from "../redux/userSlice";
import { createAlert } from "../redux/alertSlice";
import Router from "next/router";

export default function Login() {
  /* Log in page for registered users */

  const [csrfToken, setCsrfToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  //Get CSRF Token on page load.
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
    /* Allow user to log in if username and password matches. */
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
          dispatch(
            createAlert({
              type: "error",
              message: "Invalid username or password.",
            })
          );
        }
        return response.json();
      })
      //Serialized Profile data from JSONResponse in loginView
      .then((data) => {
        dispatch(updateUserInfo(data));
        Router.push(`/profile/${username}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="container-fluid">
        <h1 style={{ color: "#d6d6d6" }}>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" style={{ color: "#d6d6d6" }}>
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
            <label
              htmlFor="password"
              style={{ color: "#d6d6d6", marginTop: 5 }}
            >
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
