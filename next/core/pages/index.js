import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  //TEST useSelector
  const name = useSelector((state) => state.user.username);

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
        <p>State says: {name}</p>
      </div>
    </>
  );
}
