// "use client";

// import { signIn } from "next-auth/react";

// const Login = () => {
//     return (
//         <div>
//             <button onClick={() => signIn("google")}>
//                 ログイン
//             </button>
//         </div>
//     );
// };

// export default Login;

"use client";

import { signIn } from "next-auth/react";

const Login = () => {
    return (
        <div>
            <button onClick={() => signIn("google", { callbackUrl: 'http://localhost:3000/payment' })}>
                ログイン
            </button>
        </div>
    );
};

export default Login;
