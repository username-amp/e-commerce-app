import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user, session }) {
      console.log("JWT callback start:", { token, account, user, session });

      if (session) {
        token.user = session.user;
      }

      console.log("JWT callback end:", { token });
      return token;
    },

    async session({ session, token }) {
      console.log("Session callback:", { session, token });
      session.accessToken = token.accessToken;
      session.user = token.user; // Pass user details
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  pages: {
    signIn: "/signin",
  },
  debug: true, // Enable debugging
});
