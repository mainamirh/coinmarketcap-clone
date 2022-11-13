import { getSession, signOut } from "next-auth/react";
import connectDB from "../lib/connectDB";
import Users from "../lib/userSchema";
import { useState } from "react";
import axios from "axios";

function User({ user, bio }) {
  const [value, changeValue] = useState("");

  async function updateBio() {
    const { data } = await axios.post(
      "/api/updateBio",
      { profileId: user.profileId, bio: value },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    console.log("Bio Updated to: " + data.bio);

    location.reload();
  }

  return (
    <div>
      <h4>User session:</h4>
      <div>Address: {user.address}</div>
      <div>Bio: {bio}</div>
      <br />
      <input
        onChange={(e) => changeValue(e.target.value)}
        value={value}
      ></input>
      <button onClick={() => updateBio()}>Update Bio</button>
      <br />
      <br />
      <button onClick={() => signOut({ redirect: "/signin" })}>Sign out</button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  // MongoDB section
  await connectDB();

  const mongoUser = await Users.findOne({
    profileId: session?.user.profileId,
  }).lean();

  if (mongoUser) {
    mongoUser.bio = mongoUser.bio.toString();
  }

  return {
    props: { user: session.user, bio: mongoUser.bio },
  };
}

export default User;
