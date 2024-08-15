import { fetchMarketApplicationInfoByID } from "@/app/lib/database/market";

export default async function viewMarketApplication({params}) {
    const applicationID = params.applicationID;
    let marketApplicationInfo = await fetchMarketApplicationInfoByID(applicationID);
    marketApplicationInfo = marketApplicationInfo[0]

    console.log('marketApplicationInfo', marketApplicationInfo)

    return <article>
        <h1>{marketApplicationInfo.business_name}</h1>
        <h4>Name: {marketApplicationInfo.first_name}  {marketApplicationInfo.last_name}</h4>
        <h4>email: {marketApplicationInfo.email}</h4>
        <h4>Address:  {marketApplicationInfo.street_address}</h4>
        <h4>Address line 2: {marketApplicationInfo.street_address_line_2}</h4>
        <h4>city:  {marketApplicationInfo.city}</h4>
        <h4>state:  {marketApplicationInfo.state}</h4>
        <h4>zip:  {marketApplicationInfo.zip}</h4>
        <h4>phone:  {marketApplicationInfo.phone}</h4>
        <h4>Accept Credit Cards:  {marketApplicationInfo.accept_credit_debit === 1 ? 'Yes' : 'No'}</h4>
        <h4>Needs Electricity:  {marketApplicationInfo.electricity === 1 ? 'Yes' : 'No'}</h4>
        <h4>description of items sold:  {marketApplicationInfo.description_of_items_sold}</h4>
        <h4>how many spots:  {marketApplicationInfo.how_many_spots}</h4>
        <h4>days of participation:  {marketApplicationInfo.days_of_participation}</h4>
        <h4>paying for whole season? :  {marketApplicationInfo.pay_for_whole_season === 1 ? 'Yes' : 'No'}</h4>
        <h4>Agree to participate and pay? :  {marketApplicationInfo.agree_to_participate_pay === 1 ? 'Yes' : 'No'}</h4>
        <h4>Food Liability License:  {marketApplicationInfo.farmer_food_liability_license === 1 ? 'Yes' : 'No'}</h4>
        <h4>Accept Media Release:  {marketApplicationInfo.media_release === 1 ? 'Yes' : 'No'}</h4>
        <h4>Hold harmless (liability):  {marketApplicationInfo.hold_harmless === 1 ? 'Yes' : 'No'}</h4>
        <h4>submit date:  {marketApplicationInfo.submit_date}</h4>
        <h4>Agree to pay via paypal? :  {marketApplicationInfo.paying_via_paypal === 1 ? 'Yes' : 'No'}</h4>
        <h4>approved:  {marketApplicationInfo.approved === 1 ? 'Yes' : marketApplicationInfo.approved === 2 ? 'Denied' : 'Not Yet'}</h4>
        <h4>paid:  {marketApplicationInfo.paid === 1 ? 'Yes' : 'No'}</h4>
        <h4>Signature: <img src={marketApplicationInfo.signature} /></h4>

        {marketApplicationInfo.approved !== 1 && <a href={`/admin/marketApplications/approvals/${applicationID}/approve`}><button>Set as Approved</button></a> }
        {marketApplicationInfo.approved !== 2 && <a href={`/admin/marketApplications/approvals/${applicationID}/deny`}><button>Set as Denied</button></a>}
        {marketApplicationInfo.paid !== 1 && <a href={`/admin/marketApplications/approvals/${applicationID}/paid`}><button>Set as Paid</button></a>}
        {marketApplicationInfo.paid === 1 && <a href={`/admin/marketApplications/approvals/${applicationID}/unpaid`}><button>Set as unpaid</button></a>}



    </article>
}