import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";

interface GoogleToken extends JWT {
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
}

async function refreshAccessToken(token: GoogleToken): Promise<GoogleToken> {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GMAIL_CLIENT_ID ?? "",
      client_secret: process.env.GMAIL_CLIENT_SECRET ?? "",
      refresh_token: token.refreshToken ?? "",
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    return { ...token, accessToken: undefined };
  }

  const data = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };

  return {
    ...token,
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GMAIL_CLIENT_ID ?? "",
      clientSecret: process.env.GMAIL_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope:
            "openid email profile https://www.googleapis.com/auth/gmail.readonly",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      const googleToken = token as GoogleToken;

      // First sign-in: persist tokens from Google
      if (account) {
        return {
          ...googleToken,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at
            ? account.expires_at * 1000
            : Date.now() + 3600 * 1000,
        } satisfies GoogleToken;
      }

      // Token still valid
      if (
        googleToken.expiresAt &&
        Date.now() < googleToken.expiresAt - 60_000
      ) {
        return googleToken;
      }

      // Token expired — refresh
      return refreshAccessToken(googleToken);
    },
    async session({ session, token }) {
      const googleToken = token as GoogleToken;

      return {
        ...session,
        accessToken: googleToken.accessToken,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
