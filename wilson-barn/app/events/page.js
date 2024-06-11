import Link from "next/link";
import { getEventsList } from "../lib/database";
import EventsList from "./eventsList";



export default async function Events() {
    
    return (
        <>
        <h1>Events</h1>
        <p>
            Here lies the events
        </p>
        <div>
            <EventsList />
        </div>

        <p>Add an event here</p>
        <Link href="events/addEvent">Add Event</Link>
        </>
    )
}