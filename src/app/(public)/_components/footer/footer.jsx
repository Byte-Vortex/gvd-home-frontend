import { getBasicDetails } from "@/server/get-basic-details";
import { FooterClient } from "./footer-client";

export async function Footer() {

  const basicDetails = await getBasicDetails();

  return (
    <FooterClient basicDetails={basicDetails} />
  )
}
