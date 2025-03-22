import { makeRequestServer } from "@/lib/fetch";

export async function getBasicDetails(){
    const response = await makeRequestServer("/basicdetails/");
    return response.data;
}