import Head from "next/head";
import Header from "../components/Header";
import Trending from "../components/Trending";
import Ranking from "../components/Ranking";
import Footer from "../components/Footer";

import { getSession } from "next-auth/react";

const Home = ({ user }) => {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          background: "linear-gradient(to bottom, #212430, #17171a)",
        }}
        className=""
      >
        <Header user={user} />
        <Trending />
        <Ranking />
      </main>

      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const user = session ? session.user : null;

  return {
    props: { user: user },
  };
}

export default Home;
