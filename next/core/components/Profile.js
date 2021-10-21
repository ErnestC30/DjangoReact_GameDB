import styles from "./Profile.module.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateUserInfo } from "../redux/userSlice";
import { createAlert } from "../redux/alertSlice";
import { useDispatch } from "react-redux";

export default function Profile({ profile }) {
  /*Component that displays the user's profile information and allows them to edit information. */

  const [csrfToken, setCsrfToken] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState(profile.user.email);
  const [description, setDescription] = useState(profile.description);
  const [imageLink, setImageLink] = useState("");
  const [isImageAdded, setIsImageAdded] = useState(false);
  const loggedInID = useSelector((state) => state.user.userID);
  const loggedInName = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  let button = <p></p>;

  //Get CSRF Token on page load
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

  //Edit Profile button appears if user is on their own page.
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

  //Displays form that allows user to edit email, description, or profile image.
  function displayForm() {
    return (
      <>
        <form
          className={styles.formContainer}
          method="post"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
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
              accept="image/*"
              onChange={(e) => {
                setImageLink(e.target.files[0]);
                setIsImageAdded(true);
              }}
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

  function handleSubmit(e) {
    /* Updates the backend database and the redux store with edited information. */

    e.preventDefault();

    let data = new FormData();
    data.append("userID", loggedInID);
    data.append("email", email);
    data.append("description", description);
    if (isImageAdded) {
      data.append("image", imageLink);
    }

    //         "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
    /*  HEADERS MIGHT BE BREAKING THE FETCH REQUEST?
          headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": csrfToken,
      },
    */
    fetch("http://127.0.0.1:8000/user/edit_profile/", {
      method: "POST",
      credentials: "include",
      body: data,
    })
      .then((response) => response.json())
      //Use serialized Profile data to update redux store.
      .then((data) => {
        console.log(data);
        dispatch(updateUserInfo(data));
        dispatch(
          createAlert({
            type: "success",
            message: "Account information has been updated.",
          })
        );
        window.location.reload();
      })
      .catch((err) => console.log(err));
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
