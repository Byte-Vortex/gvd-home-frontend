
import { revalidatePath } from "next/cache";

/**
 * Handles the POST request to clear the cache.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} The response object indicating the success of the cache clearing operation.
 */
export async function POST(request) {
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split(" ")[1];
    if (token !== process.env.CLEAR_CACHE_AUTH_TOKEN) {
        return Response.json({ "success": false, "message": "Invalid Credentials!" }, {
            status: 401
        })
    }

    revalidatePath('/', 'layout')

    return Response.json({ "success": true, message: "Cache Cleared successfully!" })
}