import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000/api';

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

        try {
          // Connect to backend auth API
          const response = await fetch(`${backendUrl}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Authentication failed');
          }

          if (data.success && data.token && data.user) {
            // Return user data with token for JWT callback
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              token: data.token,
            };
          }

          return null;
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login?error=true',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as string;
        token.id = user.id;
        token.accessToken = user.token as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
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
    token?: string; // JWT token from backend
  }
  
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    }
    accessToken?: string; // Store the JWT token in the session
  }
}

// Augment jwt callback token type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    accessToken?: string; // JWT token from backend
  }
}

// Create handler with the correct exports for App Router
const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler; 