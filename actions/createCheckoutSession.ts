'use server'

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import { BasketItem } from "@/store/store";

export type Metadata = {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId: string;
};

export type GroupedBasketItem = {
    product: BasketItem["product"];
    quantity: number;
}

export async function createCheckoutSEssion(
    items: GroupedBasketItem[],
    metadata: Metadata
) {
    try {
        const itemsWithoutPrice = items.filter((item) => !item.product.price)
        if(itemsWithoutPrice.length > 0) {
            throw new Error("Some items do not have a price")
        }

        //Search for existing customer by email
        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1,
        })

        let customerId: string | undefined;
        if (customers.data.length > 0) {
            customerId = customers.data[0].id;
        }

    const isProd = process.env.NODE_ENV === "production";
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`;
    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
    const cancelUrl = `${baseUrl}/basket`;

    const session = await stripe.checkout.sessions.create({
    customer: customerId,
    customer_creation: customerId ? undefined : "always",
    customer_email: !customerId ? metadata.customerEmail : undefined,
    metadata,
    mode: "payment",
    allow_promotion_codes: true,
    payment_method_types: ['card'],
    success_url: successUrl,
    cancel_url: cancelUrl,
    shipping_address_collection: {
        allowed_countries: ['PH'], // Add more country codes as needed
    },
    phone_number_collection: {
        enabled: true,
    },
    line_items: items.map((item) => ({
        price_data: {
            currency: "php",
            unit_amount: Math.round(item.product.price! * 100),
            product_data: {
                name: item.product.name || "Unnamed Product",
                description: `Product ID: ${item.product._id}`,
                metadata: {
                    id: item.product._id
                },
                images: item.product.images && item.product.images.length > 0
        ? [imageUrl(item.product.images[0]).url()]
        : undefined,
            }
        },
        quantity: item.quantity
    }))
});

    return session.url;    
    } catch (error) {
        console.error("Error creating checkout session:", error)
        throw error;
    }
}   