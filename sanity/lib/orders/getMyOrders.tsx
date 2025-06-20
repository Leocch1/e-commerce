import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export async function getMyOrders(userId: string) {
    if (!userId) {
        throw new Error("User ID is required");
    }

        // Add logging to debug
    console.log("Fetching orders for userId:", userId);

    //Define the query to get orders based on user ID, sorted by orderDate descending
    const MY_ORDERS_QUERY = defineQuery(`
        *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
            ...,
            products[]{
                ...,
                product->
            }
        }
        `);



// In getMyOrders function, add this before the try block:
console.log("Fetching orders for userId:", userId);


    try {
        //Use sanityFetch to send the query
        const orders = await sanityFetch({
            query: MY_ORDERS_QUERY,
            params: {userId},
        });

        console.log("Orders fetched successfully:", orders.data?.length || 0, "orders");
        return orders.data || [];

    } catch (error) {
       console.error("Error fetching orders:", error);
        throw new Error("Error fetching orders");
        
    }
}