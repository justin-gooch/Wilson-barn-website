import { isAdminAuth } from "../lib/auth"
import { fetchApprovedAndPaidMarketApplications, fetchDeniedMarketApplications, fetchToBeApprovedMarketApplications, fetchToBePaidMarketApplications } from "../lib/database/market";
import { fetchDeniedRentalDates, fetchToBeApprovedRentalDates, fetchToBePaidRentalDates } from "../lib/database/rentals";

export default async function admin() {
    const isAdmin = await isAdminAuth();
    let toBeApprovedRentalDates;
    let toBePaidRentalDates;
    let deniedRentalDates;
    let approvalNeededDatesList = [];
    let paymentNeededDatesList = [];
    let deniedRentalDateList = [];

    let toBeApprovedMarketApplications;
    let toBePaidMarketApplications;
    let deniedMarketApplications;
    let approvedAndPaidApplications;
    let approvalNeededMarketApplications = [];
    let paymentNeededMarketApplications = [];
    let deniedMarketApplicationsList = [];
    let approvedAndPaidApplicationsList = [];

    
    if (isAdmin) {
        toBeApprovedRentalDates = await fetchToBeApprovedRentalDates();
        toBeApprovedRentalDates.forEach((rentalDate) => {
            approvalNeededDatesList.push(
            <li key={rentalDate.id}>
                <b>{rentalDate.rentalDate.split('T')[0]}</b>
                <a href={`/admin/rentals/approvals/${rentalDate.id}`}><button>Approve / Deny</button></a></li>)
        }) 
        toBePaidRentalDates = await fetchToBePaidRentalDates();
        toBePaidRentalDates.forEach((rentalDate) => {
            paymentNeededDatesList.push(
            <li key={rentalDate.id}>
                <b>{rentalDate.rentalDate.split('T')[0]}</b>
                <a href={`/admin/rentals/approvals/${rentalDate.id}/paid`}><button>Confirm Paid</button></a>
                <a href={`/admin/rentals/approvals/${rentalDate.id}/deny`}><button>Unconfirm / Delete</button></a>

                </li>)
        })
        deniedRentalDates = await fetchDeniedRentalDates();
        deniedRentalDates.forEach((rentalDate) => {
            deniedRentalDateList.push(
            <li key={rentalDate.id}>
                <b>{rentalDate.rentalDate.split('T')[0]}</b>
                <a href={`/admin/rentals/approvals/${rentalDate.id}/deny`}><button>Delete</button></a>
                <a href={`/admin/rentals/approvals/${rentalDate.id}`}><button>Approve</button></a>
                </li>)
        })
        toBeApprovedMarketApplications = await fetchToBeApprovedMarketApplications();
        toBeApprovedMarketApplications.forEach((marketApplication) => {
            approvalNeededMarketApplications.push(
            <li key={marketApplication.id}>
                <b>{marketApplication.business_name}</b>
                <a href={`/admin/marketApplications/approvals/${marketApplication.id}/view`}><button>View Application</button></a>
                <a href={`/admin/marketApplications/approvals/${marketApplication.id}/deny`}><button>Deny</button></a>
                <a href={`/admin/marketApplications/approvals/${marketApplication.id}`}><button>Approve</button></a>
                </li>)
        })

        toBePaidMarketApplications = await fetchToBePaidMarketApplications();
        toBePaidMarketApplications.forEach((marketApplication) => {
            paymentNeededMarketApplications.push(
            <li key={marketApplication.id}>
                <b>{marketApplication.business_name}</b>
                <a href={`/admin/marketApplications/approvals/${marketApplication.id}/view`}><button>View Application</button></a>
                <a href={`/admin/marketApplications/approvals/${marketApplication.id}/deny`}><button>Deny</button></a>
                <a href={`/admin/marketApplications/approvals/${marketApplication.id}/paid`}><button>Set as Paid</button></a>
                </li>)
        })

        deniedMarketApplications = await fetchDeniedMarketApplications();
        deniedMarketApplications.forEach((marketApplication) => {
            deniedMarketApplicationsList.push(
            <li key={marketApplication.id}>
                <b>{marketApplication.business_name}</b>
                <a href={`/admin/marketApplications/approvals/${marketApplication.id}/view`}><button>View Application</button></a>
                <a href={`/admin/marketApplications/approvals/${marketApplication.id}`}><button>Approve</button></a>
                <a href={`/admin/marketApplications/approvals/${marketApplication.id}/paid`}><button>Set as Paid</button></a>
                </li>)
        });

        approvedAndPaidApplications = await fetchApprovedAndPaidMarketApplications();
        
        approvedAndPaidApplications.forEach((marketApplication) => {
            approvedAndPaidApplicationsList.push(
            <li key={marketApplication.id}>
                <b>{marketApplication.business_name}</b>
                <a href={`/admin/marketApplications/approvals/${marketApplication.id}/view`}><button>View Application</button></a>
                <a href={`/admin/marketApplications/approvals/${marketApplication.id}/deny`}><button>Deny</button></a>
                <a href={`/admin/marketApplications/approvals/${marketApplication.id}/unpaid`}><button>Set as unpaid</button></a>
                </li>)
        });
    }  

    if(!isAdmin) {
        return <>
        <h1>Access Denied</h1>
        <p>You do not have permission to be here</p>
        
        </>
    }
    return <>
    <article>
        <h1>Rentals</h1>
    <h5>Rentals Needing Approval</h5>
    <ul>{approvalNeededDatesList}</ul>

    <h5>Rentals Needing Payment</h5>
    <ul>{paymentNeededDatesList}</ul>

    <h5>Deleted Rentals</h5>
    <ul>{deniedRentalDateList}</ul>

    <h1>Market Applications</h1>

    <h5>Market Applications Needing approval</h5>
    <ul>{approvalNeededMarketApplications}</ul>

    <h5>Market Applications Needing Payment</h5>
    <ul>{paymentNeededMarketApplications}</ul>

    <h5>Market Applications that have been denied </h5>
    <ul>{deniedMarketApplicationsList}</ul>

    <h5>Market Applications that are approved and paid</h5>
    <ul>{approvedAndPaidApplicationsList}</ul>
    </article>
    </>
}