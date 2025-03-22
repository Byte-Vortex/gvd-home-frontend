import { ThankYouPage } from "@/components/thank-you-page"

export default function Page() {

    return (

        <ThankYouPage
            title="Your payment has been successfully processed"
            subtitle="You have successfully booked your Learn Kirtan Session!"
            text=" Thank you for booking with us. You will receive the details on your provided Whatsapp no. We look forward to serving you again."
            link="/activities/services/learn-kirtan"
            linkText="Book Again"
        />

    )
}