import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        // ...add more providers here
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",

            // form inputs
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials;

                // find user
                const user = await dbConnect('users').findOne({email})
                if (!user) return null;

                // match password
                const isPasswordOk = await bcrypt.compare(password, user.password);
                if (isPasswordOk) {
                    return user;
                }

                return null;
            }
        })
    ],
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }