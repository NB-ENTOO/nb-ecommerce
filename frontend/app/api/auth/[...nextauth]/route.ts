import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

// Define custom user type to include role and password
interface MockUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

// Mock users database for demo purposes
const users: MockUser[] = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
    role: "user",
  },
  {
    id: "2",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
];

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find user in the mock database
        const user = users.find(user => 
          user.email === credentials.email && 
          user.password === credentials.password
        );

        if (user) {
          // Only return safe user properties
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        }
        
        return null;
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login?error=true',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as string;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Augment next-auth types
declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  }
  
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    }
  }
}

// Augment jwt callback token type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}

// Create handler with the correct exports for App Router
const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler; 