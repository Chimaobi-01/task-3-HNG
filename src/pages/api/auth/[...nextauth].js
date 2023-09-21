import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                const user = {
                    email: "user@example.com",
                    password: "1password"
                }
                
                return user? user: null
            }
        })
    ]
})
