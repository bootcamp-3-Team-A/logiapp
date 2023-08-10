import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


// Googleプロバイダーを設定
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
            profileUrl: "https://mylogi-370b0.firebaseapp.com/__/auth/handler",
        }),
        // ...add more providers here
    ],

    secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
