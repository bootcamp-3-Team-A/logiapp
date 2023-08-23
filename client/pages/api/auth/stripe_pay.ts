import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { initializeStripe } from '../../../components/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const stripePromise = initializeStripe();
    const stripeInstance = await stripePromise;
    if (!stripeInstance) {
      throw new Error('Stripe is not available');
    }

    // 決済成功の処理

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during payment.' });
  }
};
