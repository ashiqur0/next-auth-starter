import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const userList = [
    { email: 'zakir@gmail.com', password: 1234 },
    { email: 'sabina@gmail.com', password: 1234 },
    { email: 'rasel@gmail.com', password: 1234 },
    { email: 'china@gmail.com', password: 1234 },
    { email: 'ariful@gmail.com', password: 1234 },
]

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
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // my own login logic | return user if users credentials is okay

                const { email, password } = credentials;

                const user = userList.find(u => u.email == email);
                if (!user) return null;

                const isPasswordOk = user.password == password;
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