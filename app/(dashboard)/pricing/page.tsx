import { checkoutAction } from '@/lib/payments/actions';
import { Check, ArrowRight } from 'lucide-react';
import { getStripePrices, getStripeProducts } from '@/lib/payments/stripe';
import { SubmitButton } from './submit-button';
import { Button } from '@/components/ui/button';

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage() {
  // Only fetch prices/products if needed for Premium plan
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const premiumPlan = products.find((product) => product.name === 'Premium');
  const premiumPrice = prices.find((price) => price.productId === premiumPlan?.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 max-w-xl mx-auto">
        <PricingCard
          name="Basic"
          price={0}
          interval="month"
          features={[
            'Toegang tot restaurantoverzicht',
            'Zoek- en filterfuncties',
            'Basis restaurantinformatie',
          ]}
          isFree={true}
        />
        <PricingCard
          name="Premium"
          price={premiumPrice?.unitAmount || 1200}
          interval={premiumPrice?.interval || 'month'}
          trialDays={premiumPrice?.trialPeriodDays || 7}
          features={[
            'Volledige toegang tot restaurantreviews',
            'Gepersonaliseerde aanbevelingen',
            'AI-gestuurde aanbevelingen',
            'Premium support'
          ]}
          priceId={premiumPrice?.id}
          isFree={false}
        />
      </div>
    </main>
  );
}

function PricingCard({
  name,
  price,
  interval,
  trialDays,
  features,
  priceId,
  isFree
}: {
  name: string;
  price: number;
  interval: string;
  trialDays?: number;
  features: string[];
  priceId?: string;
  isFree: boolean;
}) {
  return (
    <div className="pt-6">
      <h2 className="text-2xl font-medium text-gray-900 mb-2">{name}</h2>
      {!isFree && trialDays && (
        <p className="text-sm text-gray-600 mb-4">
          met {trialDays} dagen gratis proefperiode
        </p>
      )}
      <p className="text-4xl font-medium text-gray-900 mb-6">
        €{price / 100}
        {!isFree && (
          <span className="text-xl font-normal text-gray-600">
            {' '}per maand
          </span>
        )}
      </p>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      {isFree ? (
        <form action="/sign-up">
          <Button 
            type="submit"
            className="w-full bg-gray-100 hover:bg-gray-200 text-black border border-gray-200 rounded-full flex items-center justify-center"
          >
            Start Gratis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      ) : (
        <form action="/sign-up">
          <input type="hidden" name="plan" value="premium" />
          <input type="hidden" name="priceId" value={priceId} />
          <SubmitButton />
        </form>
      )}
    </div>
  );
}
