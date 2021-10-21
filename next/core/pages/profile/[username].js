import Profile from "../../components/Profile";

export default function ProfilePage({ profile }) {
  /* Page that displays a user's profile */
  /* Can show favorited games ...*/

  return (
    <>
      <div className="container-fluid buffer">
        <Profile profile={profile} />
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://127.0.0.1:8000/user/profile/");
  const profiles = await res.json();
  const paths = profiles.map((profile) => {
    return {
      params: {
        username: profile.user.username,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const username = context.params.username;
  const res = await fetch(`http://127.0.0.1:8000/user/profile/${username}`);
  const data = await res.json();

  return {
    props: { profile: data },
  };
}
