import { makeRequestServer } from "@/lib/fetch";

export async function getDonationPageDetails(){
    const response = await makeRequestServer("/donation/donationhomepage/");
    return response.data;
}