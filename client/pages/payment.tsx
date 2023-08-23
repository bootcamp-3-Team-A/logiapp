import { useRouter } from 'next/router';
import { useEffect } from 'react';

const PaymentPage = () => {
    const router = useRouter();

    useEffect(() => {
        // Stripeのリンクにリダイレクト
        window.location.href = 'https://buy.stripe.com/test_8wM29q2PNh1EduE6op';
    }, []);

    return (
        <div>
            <p>Redirecting to payment...</p>
        </div>
    );
};

export default PaymentPage;
