import { isAdminAuth } from "@/app/lib/auth";
import { setRentalAsApproved } from "@/app/lib/database/rentals";
import { sendRentalInvoice } from "@/app/lib/paypal";

export default async function approve({params}) {
    const adminAuthed = await isAdminAuth();


    const rentalID = params.rentalID;

    if(adminAuthed) {
        const paypalInvoice = await sendRentalInvoice(rentalID);
        if (paypalInvoice) {
            return <>
                <h1>Invoice Successfully Sent</h1>
                <p>once paid, please confirm via the rental page</p>
            </>
        } else {
            await setRentalAsApproved(rentalID);
            return <article>
                <h1>the invoice was already created</h1>
                <p>However it is now approved and you can confirm it's payment</p>
                </article>
        }

    }


}