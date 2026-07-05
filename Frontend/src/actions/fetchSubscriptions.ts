import { supabase } from '@/lib/supabase';

export interface Subscription {
  id: string;
  vendor_name: string;
  billed_amount: number;
  currency: string;
  is_trial: boolean;
  created_at?: string;
}

export async function fetchSubscriptions(): Promise<Subscription[]> {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching subscriptions:', error);
      return getMockSubscriptions();
    }

    return data as Subscription[];
  } catch (error) {
    console.error('Unexpected error fetching subscriptions:', error);
    return getMockSubscriptions();
  }
}

function getMockSubscriptions(): Subscription[] {
  return [
    { id: '1', vendor_name: 'Netflix', billed_amount: 15.99, currency: 'USD', is_trial: false },
    { id: '2', vendor_name: 'Adobe Creative Cloud', billed_amount: 54.99, currency: 'USD', is_trial: false },
    { id: '3', vendor_name: 'Figma', billed_amount: 12.00, currency: 'USD', is_trial: false },
    { id: '4', vendor_name: 'Vercel Pro', billed_amount: 20.00, currency: 'USD', is_trial: true },
    { id: '5', vendor_name: 'GitHub Copilot', billed_amount: 10.00, currency: 'USD', is_trial: false },
    { id: '6', vendor_name: 'Spotify Premium', billed_amount: 10.99, currency: 'USD', is_trial: true },
  ];
}
