import { loadStripe, Stripe } from '@stripe/stripe-js';

export async function initializeStripe() {
    const stripePromise: Promise<Stripe | null> = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
    );

    return stripePromise;
}
