import Calendar from "../components/RentalCalendar/calendar";
import { isAdminAuth } from "../lib/auth";
import { fetchAvailableRentalDates, fetchToBeApprovedRentalDates } from "../lib/database/rentals";

export default async function Rentals() {
    let toBeApprovedRentalDates;
    let approvalNeededDatesList = [];
    const availableRentals = await fetchAvailableRentalDates();
    const adminAuthed = await isAdminAuth();
    if (adminAuthed) {
        toBeApprovedRentalDates = await fetchToBeApprovedRentalDates();
        toBeApprovedRentalDates.forEach((rentalDate) => {
            approvalNeededDatesList.push(<li key={rentalDate.id}><a href={`rentals/approvals/${rentalDate.id}`}>{rentalDate.rentalDate.split('T')[0]}</a></li>)
        })   
    }

    return(
        <article className="article">
            <h1>Barn Rentals</h1>
            <ul className="event-item">
                <li>The Wilson Barn is a unique site to host a gathering such as a business event, family reunion, birthday or graduation party. </li>
                <li>Rental includes the use of the main barn area and grounds, including restrooms, electricity and limited kitchen amenities </li>
                <li>(freezer, sink, refrigerator and microwave).  </li><li>For more information on reservations or fees please all (734) 427-4311.</li>
            </ul>
            <h1>Available Rentals</h1>
            <Calendar availableRentals={availableRentals} />

            {adminAuthed && <>
            
            </>}
        </article>
    )
}