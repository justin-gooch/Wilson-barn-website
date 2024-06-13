import Image from "next/image";

export default function Event(event) {

    if (event) {
        return <main>
        <h1>{event.title}</h1>
        <h6>{event.created_at}</h6>
        <h6>By: {event.userFirstName} {event.userLastName}</h6>
        <Image 
            src={event.image}
            width={200} 
            height={150} 
            alt={event.title} />

        <div>{event.content}</div>

    </main>

    }
    
    

}