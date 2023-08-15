import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";



// Googleプロバイダーを設定
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
            profileUrl: "https://mylogi-370b0.firebaseapp.com/__/auth/handler",
        }),

    ],

    secret: process.env.NEXTAUTH_SECRET,

    // callbacks: {
    //     async signIn({ account }) {
    //         if (account?.provider === "google") {
    //             return Promise.resolve("/start");
    //         }
    //         return Promise.resolve(false);
    //     },
    // },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // You can customize the signIn callback as needed
            return true; // Allow the sign-in flow to continue
        },
        async redirect({ url, baseUrl }) {
            return baseUrl + '/'; // Redirect to your start page
        },
    },
});