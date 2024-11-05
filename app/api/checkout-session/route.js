import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { cart } = await req.json();

    const lineItems = cart.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image],
        },
        unit_amount: item.price * 100, // Convert to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "paypal"],
      billing_address_collection: "required", // Capture billing address
      allow_promotion_codes: true,
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/shop/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/shop/cart`,
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// export async function POST(req) {
//   try {
//     const { cart } = await req.json();

//     const lineItems = cart.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.title,
//           images: [item.image],
//         },
//         unit_amount: item.price * 100, // Convert to cents
//       },
//       quantity: item.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card", "paypal"],
//       billing_address_collection: "required", // Capture billing address
//       allow_promotion_codes: true,
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_URL}/shop/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_URL}/shop/cart`,
//     });

//     return new Response(JSON.stringify({ sessionId: session.id }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
