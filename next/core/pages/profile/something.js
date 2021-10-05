import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Profile() {
  const name = useSelector((state) => state.user.username);
  const email = useSelector((state) => state.user.email);
  const image = useSelector((state) => state.user.image);
  const description = useSelector((state) => state.user.description);

  return <p>Hello</p>;
  /*
  useEffect(() => {
    fetch("http://localhost:8000/user/profile/", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((err) => {});
  }, []);

  return (
    <>
      <div className="container-fluid introduction">
        <p></p>
        <img src={image} alt="profile pic" />
        <p>{image}</p>
        <p>State:</p>
        <p>{name}</p>
        <p>{email}</p>
        <p>{description}</p>
      </div>
    </>
  );
  */
}
