import EventsList from "./events/eventsList";
import { getEvents } from "./lib/database/events";

export default async function Home() {

  const eventsList = await getEvents();

  return (
    <main>
      <h1>Welcome To The Wilson Barn</h1>
      <h3>We are located at the corner of West Chicago and Middlebelt in Livonia Michigan</h3>
      <EventsList eventsList={eventsList} />
    </main>
  );
}
