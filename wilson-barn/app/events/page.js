import Link from "next/link";
import { getEventsList } from "../lib/database";
import EventsList from "./eventsList";
import { getEvents } from "../lib/database";


export default async function Events() {
    const eventsList = await getEvents();
    
    return (
        <>
        <h1>Events</h1>
        <div>
            <EventsList eventsList={eventsList} />
        </div>

        <p>Add an event here</p>
        <Link href="events/addEvent">Add Event</Link>
        </>
    )
}