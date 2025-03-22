import { ThankYouPage } from "@/components/thank-you-page"

export default function Page() {

    return (

        <ThankYouPage
            title="Your payment has been successfully processed"
            subtitle="You have successfully booked your Prasadam."
            text=" Thank you for booking with us. You will receive a Entry Coupon on your provided Whatsapp no. We look forward to serving you again. Enjoy your Prasadam!"
            link="/prasadam-booking"
            linkText="Book Again"
        />

    )
}