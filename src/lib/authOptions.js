import { dbConnect } from "@/lib/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
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
                const user = await dbConnect('users').findOne({ email })
                if (!user) return null;

                // match password
                const isPasswordOk = await bcrypt.compare(password, user.password);
                if (isPasswordOk) {
                    return user;
                }

                return null;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            try {
                const payload = {
                    ...user, provider: account.provider,
                    providerId: account.providerAccountId,
                    role: 'user',
                    createdAt: new Date().toISOString(),
                }

                if (!user?.email) {
                    return false;
                }
                const isExists = await dbConnect('users').findOne({
                    email: user.email,
                    providerId: account.providerAccountId
                });
                if (!isExists) {
                    const result = await dbConnect('users').insertOne(payload);
                }

                return true;
            } catch (error) {
                return false;
            }
        },
        // async redirect({ url, baseUrl }) {
        //     return baseUrl
        // },
        async session({ session, user, token }) {
            if (token) {
                session.role = token.role;
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.email = user.email;
                token.role = user.role;
            }
            return token
        }
    }
}