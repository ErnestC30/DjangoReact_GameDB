import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedIn, loggedOut } from "../redux/userSlice";
import Router from "next/router";

//revert state to initial, remove session, redirect to home page
export default function logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("http://localhost:8000/user/csrf/", {
      credentials: "include",
    })
      .then((res) => {
        let csrfToken = res.headers.get("X-CSRFToken");
        fetch("http://localhost:8000/user/logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify({}),
        }).then((response) => {
          dispatch(loggedOut());
          setTimeout(() => {
            Router.push("/");
          }, 3000);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="container-fluid" style={{ marginTop: 80 }}>
        <p style={{ color: "#d6d6d6" }}>
          You have been logged out, returning to home page.
        </p>
      </div>
    </>
  );
}
