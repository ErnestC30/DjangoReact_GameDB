import { useState, useEffect } from "react";

export default function Home() {
  const [welcomeMessage, setWelcomeMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/user/profile/", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWelcomeMessage(`Welcome ${data.username}`);
      })
      .catch((err) => {
        setWelcomeMessage("Not logged in.");
      });
  }, []);

  return (
    <>
      <div className="introduction">
        <p>Home Page</p>
        <p>{welcomeMessage}</p>
      </div>
    </>
  );
}
