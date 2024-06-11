import { createEvent } from "@/actions/events";
import EventForm from "@/app/components/eventForm/event-form";

export default function newEventPage() {
    return <EventForm action={createEvent} />
}