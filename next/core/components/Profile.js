import styles from "./Profile.module.css";

export default function Profile({ profile }) {
  return (
    <>
      <div className="container-fluid">
        <img src={profile.image} alt="profile image" />
        <div className={styles.text}>
          <p>{profile.user.username}</p>
          <p>{profile.user.email}</p>
          <p>{profile.description}</p>
        </div>
      </div>
    </>
  );
}
