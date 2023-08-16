import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";



// Googleプロバイダーを設定
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
            profileUrl: "https://mylogi-370b0.firebaseapp.com/__/auth/handler",
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    password: profile.password,
                }
            }
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async signIn({ }) {
            return true;
        },
        async redirect({ baseUrl }) {
            return baseUrl + '/';
        },
    },
});