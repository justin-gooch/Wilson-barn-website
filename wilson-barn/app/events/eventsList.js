import Link from "next/link";
import { getEvents } from "../lib/database";
import Image from "next/image";

export default async function EventsList() {
    const eventsList = await getEvents();
    console.log('eventsList', eventsList)
        return (
            <ul className="events">
                {eventsList.map((event) => (
                    <li key={event.id} className={`event-item primary-background`}>
                        <Link href={`events/${event.id}`}>
                        <Image 
                        src={event.image}
                        width={200} 
                        height={150} 
                        alt={event.title} />
                        <div className='event-card'>
                        <h1>{event.title}</h1>
                        <h6>{event.description}</h6>
                        <h6>{new Date(event.eventDateTime).toLocaleString()}</h6>
                        </div>
                    
                        </Link>
                    </li>
                ))}
            </ul>
        );

}