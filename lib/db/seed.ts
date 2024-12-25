import { stripe } from '../payments/stripe';
import { db } from './drizzle';
import { users, teams, teamMembers, subscriptionPlans } from './schema';
import { hashPassword } from '@/lib/auth/session';

async function createStripePremiumProduct() {
  console.log('Creating Stripe Premium product...');

  try {
    const premiumProduct = await stripe.products.create({
      name: 'Premium',
      description: 'Gepersonaliseerde restaurantaanbevelingen en reviews',
    });

    const premiumPrice = await stripe.prices.create({
      product: premiumProduct.id,
      unit_amount: 1200, // €12 in cents
      currency: 'eur',
      recurring: {
        interval: 'month',
        trial_period_days: 7,
      },
    });

    console.log('Stripe Premium product and price created successfully.');
    return premiumPrice.id;
  } catch (error) {
    console.error('Error creating Stripe product:', error);
    throw error;
  }
}

async function seedSubscriptionPlans(premiumPriceId: string) {
  console.log('Creating subscription plans...');

  try {
    // Create Free plan
    await db.insert(subscriptionPlans).values({
      name: 'Gratis',
      description: 'Basis toegang tot restaurantoverzicht',
      priceId: null,
      features: [
        'Basis toegang tot restaurantoverzicht',
        'Zoek- en filtermogelijkheden',
        'Beperkte zoekresultaten'
      ],
      active: true
    });

    // Create Premium plan
    await db.insert(subscriptionPlans).values({
      name: 'Premium',
      description: 'Gepersonaliseerde restaurantaanbevelingen en reviews',
      priceId: premiumPriceId,
      features: [
        'Gepersonaliseerde aanbevelingen',
        'Volledige toegang tot reviews',
        'Schrijf zelf reviews',
        'AI-gestuurde aanbevelingen',
        'Onbeperkte zoekresultaten',
        'Premium support'
      ],
      active: true
    });

    console.log('Subscription plans created successfully.');
  } catch (error) {
    console.error('Error creating subscription plans:', error);
    throw error;
  }
}

async function seed() {
  try {
    // Create Stripe Premium product and get priceId
    const premiumPriceId = await createStripePremiumProduct();

    // Seed subscription plans
    await seedSubscriptionPlans(premiumPriceId);

    // Create test user
    const email = 'test@test.com';
    const password = 'admin123';
    const passwordHash = await hashPassword(password);

    const [user] = await db
      .insert(users)
      .values({
        email: email,
        passwordHash: passwordHash,
        role: "owner",
      })
      .returning();

    console.log('Initial user created.');

    const [team] = await db
      .insert(teams)
      .values({
        name: 'Test Team',
      })
      .returning();

    await db.insert(teamMembers).values({
      teamId: team.id,
      userId: user.id,
      role: 'owner',
    });

    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Seed process failed:', error);
    throw error;
  }
}

seed()
  .catch((error) => {
    console.error('Seed process failed:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Seed process finished. Exiting...');
    process.exit(0);
  });
