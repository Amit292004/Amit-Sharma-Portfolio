import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "amitsharma72020@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email?.trim().toLowerCase();
        if (
          (email === "amitsharma72020@gmail.com" || email === "admin@amitsingh.in") &&
          credentials?.password === "admin123"
        ) {
          return { id: "1", name: "Amit Sharma", email: "amitsharma72020@gmail.com" }
        }
        return null
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "super-secret-jwt-key-for-portfolio-2026",
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
