import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import styles from "./Profile.module.css";

export default function Profile({ profile }) {
  const [csrfToken, setCsrfToken] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState(profile.user.email);
  const [description, setDescription] = useState(profile.description);
  const [imageLink, setImageLink] = useState(profile.image);
  const loggedInName = useSelector((state) => state.user.username);
  let button = <p></p>;

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

  //Lets user edit their own profile.
  if (loggedInName == profile.user.username) {
    button = (
      <button
        type="button"
        className={`btn btn-primary`}
        style={{ marginTop: "5px" }}
        onClick={() => setShowForm(!showForm)}
      >
        Edit Profile
      </button>
    );
  }

  //Edit email, image, description
  function displayForm() {
    return (
      <>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className={styles.text}>
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Change email here"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image" className={styles.text}>
              Image
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={(e) => setImageLink(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className={styles.text}>
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="5"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginTop: "7px" }}
          >
            Submit
          </button>
        </form>
      </>
    );
  }

  //Need to update database and redux store
  function handleSubmit(e) {
    e.preventDefault();
    console.log(csrfToken);
    fetch("http://127.0.0.1:8000/user/edit_profile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        description: description,
        image: imageLink,
      }),
    }).then((response) => response);
  }

  return (
    <>
      <div className={styles.profileContainer}>
        <div className={styles.imageContainer}>
          <img
            className={styles.profileImage}
            src={profile.image}
            alt="profile image"
          />
        </div>
        <div className={styles.textContainer}>
          <p className={`${styles.text} ${styles.username}`}>
            {profile.user.username}
          </p>
          <p className={styles.text}>{profile.user.email}</p>
          <p className={styles.text}>{profile.description}</p>
        </div>
      </div>
      {button}
      {showForm ? displayForm() : <p></p>}
    </>
  );
}
