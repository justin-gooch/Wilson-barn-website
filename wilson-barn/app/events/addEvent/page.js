import { createEvent } from "@/actions/events";
import EventForm from "@/app/components/eventForm/event-form";
import { isAdminAuth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

export default async function newEventPage() {
    const result = await isAdminAuth();
    if(!result) {
        return redirect('/')
    }
    return <EventForm action={createEvent} />
}