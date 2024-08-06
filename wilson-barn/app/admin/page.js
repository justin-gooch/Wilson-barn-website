import { isAdminAuth } from "../lib/auth"
import { fetchToBeApprovedRentalDates } from "../lib/database/rentals";

export default async function admin() {
    const isAdmin = await isAdminAuth();
    let toBeApprovedRentalDates;
    let approvalNeededDatesList = [];

    
    if (isAdmin) {
        toBeApprovedRentalDates = await fetchToBeApprovedRentalDates();
        console.log(toBeApprovedRentalDates, typeof toBeApprovedRentalDates);
        toBeApprovedRentalDates.forEach((rentalDate) => {
            console.log(rentalDate)
            approvalNeededDatesList.push(<li key={rentalDate.id}><a href={`rentals/approvals/${rentalDate.id}`}>{rentalDate.rentalDate.split('T')[0]}</a></li>)
        }) 
    }  

    if(!isAdmin) {
        return <>
        <h1>Access Denied</h1>
        <p>You do not have permission to be here</p>
        
        </>
    }
    return <>
    <h1>Rentals For Approval</h1>
    <ul>{approvalNeededDatesList}</ul>
    </>
}