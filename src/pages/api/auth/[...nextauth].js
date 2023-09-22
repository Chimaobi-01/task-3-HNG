import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


const authOption = {

    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            type: "credentials",
            credentials: {
                email: { label: 'email', type: 'email', placeholder: 'email' },
                password: { label: 'password', type: 'password' }
            },
            authorize(credentials) {
                const { email, password } = credentials
                if (email === "user@example.com" && password === "1Password") {
                    return { id: 1, name: "user", email: "user@example.com" }
                }
                return null

            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 Days
    },
}

export default NextAuth(authOption)