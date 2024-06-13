import { getEvent } from "@/app/lib/database";
import Event from "./event";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function EventPage({params}) {
    const eventId = params.eventId;
    const event = await getEvent(eventId)

    if(!event) {
        notFound();
    }

    const thisEvent = event[0]

    return (
        <article className='event'>
            <header className='event-header'>
                <h1>{thisEvent.title}</h1>
                <h6>By: {thisEvent.userFirstName} {thisEvent.userLastName}<br/>
                {thisEvent.created_at}</h6>
                <><Image 
                        src={thisEvent.image}
                        width={200} 
                        height={150} 
                        alt={thisEvent.title} /></>

            </header>
            <p>
                {thisEvent.content}
            </p>
        </article>
    );

}