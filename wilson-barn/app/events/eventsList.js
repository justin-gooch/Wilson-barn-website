import Link from "next/link";
import { getEvents } from "../lib/database";
import Image from "next/image";
import logo from '@/public/logo.jpeg'

export default async function EventsList() {
    const eventsList = await getEvents();
    console.log('events list = ', eventsList)

        return (
            <ul>
                {eventsList.map((event) => (
                    <li key={event.id}>

                        <Link href={`events/${event.id}`}>
                        <Image 
                        src={event.image}
                        width={150} 
                        height={50} 
                        alt={event.title} />
                        {event.title}</Link>
                    </li>
                ))}
            </ul>
        );

}