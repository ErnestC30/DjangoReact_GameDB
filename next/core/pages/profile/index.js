import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const name = useSelector((state) => state.user.username);
  const email = useSelector((state) => state.user.email);
  const image = useSelector((state) => state.user.image);
  const description = useSelector((state) => state.user.description);

  useEffect(() => {
    fetch("http://localhost:8000/user/profile/", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <div className="container-fluid introduction">
        <p>Home Page</p>
        <p></p>
        <p>State:</p>
        <p>{name}</p>
        <p>{email}</p>
        <p>{image}</p>
        <p>{description}</p>
      </div>
    </>
  );
}
