// NextAuth の API エンドポイント
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
        async redirect({ url, baseUrl }) {
            return baseUrl + '/payment';
        },

    },


    // callbacks: {
    //     async signIn() {
    //         return true; // Continue with the sign-in
    //     },
    //     async redirect({ url, baseUrl }) {
    //         if (url.startsWith(baseUrl + '/payment')) {
    //             return baseUrl + '/payment';
    //         } else {
    //             return baseUrl + '/';
    //         }
    //     },
    // }

    // callbacks: {
    //     async signIn() {
    //         // ログイン後の遷移先を指定
    //         return "/payment";
    //     },
    //     async signOut() {
    //         // ログアウト後の遷移先を指定
    //         return "/";
    //     },

    // },

    // callbacks: {
    //     async redirect({ url, baseUrl }) {
    //         if (url === 'signOut') {
    //             return "/";
    //         }
    //         if (url.startsWith(baseUrl)) {
    //             return "/payment";
    //         }
    //         return baseUrl;
    //     },
    // },



});