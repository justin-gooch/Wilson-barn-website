import { setRentalAsPaid } from "@/app/lib/database/rentals";

export default async function rentalIsPaid({params}) {
    const rentalID = params.rentalID;

    await setRentalAsPaid(rentalID);
    return <h1>this rental has been set as paid</h1>
}