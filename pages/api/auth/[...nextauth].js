import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "../../../models/user";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user) {
      await User.findOneAndUpdate(
        {
          email: user.user.email,
        },
        {
          name: user.user.name,
          image: user.user.image,
          since: Date.now(),
        },
        { upsert: true }
      );
      return true;
    },
  },
});
