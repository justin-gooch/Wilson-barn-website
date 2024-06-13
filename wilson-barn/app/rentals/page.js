import Calendar from "../components/calendar/calendar";

export default function rentals() {
    return (
        <article className="article">
            <h1>Barn Rentals</h1>
            <ul className="event-item">
            <li>The Wilson Barn is a unique site to host a gathering such as a 
            business event, family reunion, birthday or graduation party. </li>
            <li>Rental includes the use of the main barn area and grounds, 
            including restrooms, electricity and limited kitchen amenities </li>
            <li>(freezer, sink, refrigerator and microwave).  </li>
             
            
            
            <li>For more information on reservations or fees please all (734) 427-4311.</li>
            </ul>

            <Calendar />
        </article>
    )
}