import { deleteRental } from "@/app/lib/database/rentals";

export default async function deleteThisRental({params}) {
    const rentalID = params.rentalID;
    await deleteRental(rentalID);

    return <>
    <h1>The rental has been deleted</h1>
    <p>this date is now avaialble for renting</p>
    </>

}