import Link from "next/link";
import EventsList from "./eventsList";



export default async function Events() {
    
    return (
        <>
        <h1>Events</h1>
        <div>
            <EventsList />
        </div>

        <p>Add an event here</p>
        <Link href="events/addEvent">Add Event</Link>
        </>
    )
}