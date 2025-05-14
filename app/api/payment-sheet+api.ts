import { stripe } from "../../stripe-server";

export async function POST(req: Request) {
    // Call app-metadata route with nothing passed in

    // fetch the /api/app-metadata route from the env public base url 
    // const metaRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/app-metadata`, {
    //     headers: { Authorization: `Bearer ${token}` }
    // });
    // const { appMetadata } = await metaRes.json();
    // const customer = appMetadata.stripe_customer_id;

    const customer = "cus_P76666666666666";

    
  
    // get the users ephemeral key from the app metadata
    const ephemeralKey = await stripe.ephemeralKeys.create({
        customer: customer},
        {apiVersion: "2024-11-20.acacia"}
    );

    // create a payment sheet
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
        currency: "usd",
        customer: customer,
        automatic_payment_methods: {enabled: true},
    });

    return new Response(JSON.stringify({
        paymentIntent: paymentIntent.client_secret,
        ephemeralKey: ephemeralKey.secret,
        customer: customer,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    }), {
        headers: { 'Content-Type': 'application/json' }
    });
}