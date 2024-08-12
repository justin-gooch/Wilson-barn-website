import Link from "next/link";
// import { getEvents } from "../lib/database";
import { getEvents } from "../lib/database/events";
import EventsList from "./eventsList";
import { isAdminAuth } from "../lib/auth";


export default async function Events() {
    const eventsList = await getEvents();
    const adminAuthed = await isAdminAuth();
    
    return (
        <>
        <h1>Events</h1>
        <div>
            <EventsList eventsList={eventsList} />
        </div>

        {adminAuthed &&
            <><p>Add an event here</p>
        <Link href="events/addEvent">Add Event</Link> </>}
        </> 
    )
}