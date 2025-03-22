import { makeRequestServer } from "@/lib/fetch";

export async function getScriptTags(slug = "global") {

    try {
        const response = await makeRequestServer("/header_scripts/", {
            method: "POST",
            data: {
                slug
            }
        })
        return response.data.scripts;
    } catch (error) {
        return [];
    }
}