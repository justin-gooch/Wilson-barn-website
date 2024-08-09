import { isAdminAuth } from "../lib/auth"
import { fetchDeniedRentalDates, fetchToBeApprovedRentalDates, fetchToBePaidRentalDates } from "../lib/database/rentals";

export default async function admin() {
    const isAdmin = await isAdminAuth();
    let toBeApprovedRentalDates;
    let toBePaidRentalDates;
    let deniedRentalDates;
    let approvalNeededDatesList = [];
    let paymentNeededDatesList = [];
    let deniedRentalDateList = [];

    
    if (isAdmin) {
        toBeApprovedRentalDates = await fetchToBeApprovedRentalDates();
        toBeApprovedRentalDates.forEach((rentalDate) => {
            approvalNeededDatesList.push(
            <li key={rentalDate.id}>
                <b>{rentalDate.rentalDate.split('T')[0]}</b>
                <a href={`admin/rentals/approvals/${rentalDate.id}`}><button>Approve / Deny</button></a></li>)
        }) 
        toBePaidRentalDates = await fetchToBePaidRentalDates();
        toBePaidRentalDates.forEach((rentalDate) => {
            paymentNeededDatesList.push(
            <li key={rentalDate.id}>
                <b>{rentalDate.rentalDate.split('T')[0]}</b>
                <a href={`admin/rentals/approvals/${rentalDate.id}/paid`}><button>Confirm Paid</button></a>
                <a href={`admin/rentals/approvals/${rentalDate.id}/deny`}><button>Unconfirm / Delete</button></a>

                </li>)
        })
        deniedRentalDates = await fetchDeniedRentalDates();
        deniedRentalDates.forEach((rentalDate) => {
            deniedRentalDateList.push(
            <li key={rentalDate.id}>
                <b>{rentalDate.rentalDate.split('T')[0]}</b>
                <a href={`admin/rentals/approvals/${rentalDate.id}/deny`}><button>Delete</button></a>
                <a href={`admin/rentals/approvals/${rentalDate.id}`}><button>Approve</button></a>
                </li>)
        })


    }  

    if(!isAdmin) {
        return <>
        <h1>Access Denied</h1>
        <p>You do not have permission to be here</p>
        
        </>
    }
    return <>
    <h1>Rentals Needing Approval</h1>
    <ul>{approvalNeededDatesList}</ul>

    <h1>Rentals Needing Payment</h1>
    <ul>{paymentNeededDatesList}</ul>

    <h1>Deleted Rentals</h1>
    <ul>{deniedRentalDateList}</ul>
    </>
}