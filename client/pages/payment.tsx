import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PaymentPage = () => {
    const router = useRouter();

    useEffect(() => {
        // Stripeのリンクにリダイレクト
        window.location.href = 'https://checkout.stripe.com/c/pay/cs_test_a1mjARxPV9CQxzMEkNH6SnMrVN659jAeBtbYFzINyHHBODk1uPpOith9NV#fidkdWxOYHwnPyd1blpxYHZxWjA0S2EwcVJNTGtQQkBzcnVOcTxMTDVnMTZJa3xLfWJLX002M3J0U3I1YGN0cW9iMVM9NGtBSkJ8SjJuNkszMzw1ajVHSUhKTGtybVxOT3dXNEswZENmPENJNTVcZDwxUDNrMCcpJ3VpbGtuQH11anZgYUxhJz8ncWB2cVo9ckg3PHQ3VUttNEBhcEAzanUneCUl';
    }, []);

    return (
        <div>
            <p>Redirecting to payment...</p>
        </div>
    );
};

export default PaymentPage;
