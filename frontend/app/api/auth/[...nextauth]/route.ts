import NextAuth from "next-auth";
import { authConfig } from '@/lib/auth.config';

// Create handler with the correct exports for App Router
const handler = NextAuth(authConfig);
export { handler as GET, handler as POST }; 