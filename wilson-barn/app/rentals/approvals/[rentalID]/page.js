import { isAdminAuth } from "@/app/lib/auth";
import { fetchRentalInfo } from "@/app/lib/database/rentals";

export default async function rentalApprovalForm({params}) {
   const rentalID = params.rentalID;
   const adminAuthed = await isAdminAuth();
   const rentalInfo = await fetchRentalInfo(rentalID)
   const thisRental = rentalInfo[0]

   if(adminAuthed) {
    return(

        <>
        <article className="article">

        <p>Rental for {thisRental['eventDate'].split('T')[0]}</p>
        <p>email: {thisRental['email']}</p>
        <p>Name: {thisRental['name']}</p>
        <p>Phone number: {thisRental['phone']}</p>
        <p>Event Details: {thisRental['eventType']}</p>
        <p>Setup Time Initial: {thisRental['setupTimeInitial']} <br/> 
        Checkout Initial: {thisRental['checkoutInitial']} <br/>
        Close Time Initial: {thisRental['closeTimeInitial']} <br/>
        No Alcohol Initial: {thisRental['noAlcoholInitial']} <br/>
        No Baloons Initial: {thisRental['noBaloonsInitial']} <br/>
        No Smoking Initial: {thisRental['noSmokingInitial']}</p>
        <p>Date Submitted: {thisRental['submitDate']}</p>
        <p>Signature <img src={thisRental['signature']} /> </p>
        <p><a href={`/rentals/approvals/${rentalID}/approve`}>Approve</a> <a href={`/rentals/approvals/${rentalID}/deny`}>Deny</a></p>
        </article>
        </>
       )

   }
   

}