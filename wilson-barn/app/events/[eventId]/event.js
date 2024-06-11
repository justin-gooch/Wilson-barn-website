import Image from "next/image";

export default function Event(event) {
    console.log('eventjs event', event)
    if (event) {
        return <main>
        <h1>{event.title}</h1>
        <h6>{event.created_at}</h6>
        <h6>By: {event.userFirstName} {event.userLastName}</h6>
        {event.image && event.image.trim().length > 0 && <Image src={event.image} />}
        <div>{event.content}</div>

    </main>

    }
    
    

}