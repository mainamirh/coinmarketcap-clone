import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import Moralis from "moralis";
import connectDB from "../../../lib/connectDB";
import Users from "../../../lib/userSchema";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "MoralisAuth",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const { message, signature } = credentials;

          await Moralis.start({
            apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY,
          });

          const { address, profileId, expirationTime } = (
            await Moralis.Auth.verify({ message, signature, network: "evm" })
          ).raw;

          const user = { address, profileId, expirationTime, signature };

          // MongoDB section
          await connectDB();
          const mongoUser = await Users.findOne({ profileId: profileId });

          if (!mongoUser) {
            await Users.create({
              profileId: profileId,
            });
          }

          return user;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session.expires = token.user.expirationTime;
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
