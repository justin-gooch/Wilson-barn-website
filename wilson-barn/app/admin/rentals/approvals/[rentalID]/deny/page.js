import { setRentalAsDenied } from "@/app/lib/database/rentals"

export default async function denyRental({params}) {
    const rentalID = params.rentalID;
    await setRentalAsDenied(rentalID)
    return <>
        <h1>This rental has been denied</h1>
        <p>To delete, click here: <a href={`/admin/rentals/approvals/${rentalID}/delete`}><button>Delete</button></a></p>
    </>
   
}