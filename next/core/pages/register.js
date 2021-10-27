import { useState, useEffect } from "react";
import { createAlert } from "../redux/alertSlice";
import { useDispatch } from "react-redux";
import Router from "next/router";

export default function register() {
  /* Page for new user to create an account */

  const [csrfToken, setCsrfToken] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const dispatch = useDispatch();

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
    /* Checks for correct form information then sends to backend for further information validation.
       Creates a new account and redirects to login page if all the information is valid. */

    e.preventDefault();
    let isValidForm = true;

    //All fields not filled out.
    if (!username || !email || !password || !passwordConfirm) {
      dispatch(
        createAlert({
          type: "error",
          message: "All fields must be filled out.",
        })
      );
      isValidForm = false;
    }
    //Incorrect password confirmation.
    if (password !== passwordConfirm) {
      dispatch(
        createAlert({
          type: "error",
          message: "Passwords entered did not match.",
        })
      );
      isValidForm = false;
    }

    if (isValidForm) {
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
        .then((data) => {
          dispatch(
            createAlert({
              type: data.alert.type,
              message: data.alert.message,
            })
          );
          //Reroute to login page on successful register.
          if (data.alert.type == "success") {
            setTimeout(() => Router.push("/login/"), 3050);
          }
        });
    }
  }

  return (
    <>
      <div className="container-fluid">
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
