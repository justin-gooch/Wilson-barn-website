import { getEvent } from "@/app/lib/database/events";
import Event from "./event";
import { notFound } from "next/navigation";

export default async function EventPage({params}) {
    const eventId = params.eventId;
    const event = await getEvent(eventId)

    if(!event) {
        notFound();
    }

    const thisEvent = event[0]
    console.log(thisEvent);

    return (
        <article className='event'>
            <header className='event-header'>
                <h1>{thisEvent.title}</h1>
                <h6>By: {thisEvent.userFirstName} {thisEvent.userLastName}<br/>
                {thisEvent.created_at}</h6>
            </header>
            <p>
                {thisEvent.content}
            </p>
        </article>
    );

}