import '@testing-library/jest-dom'
import { render, screen } from "@testing-library/react";
import EventsList from "../eventsList";

describe("EventsList", () => {
  test("renders events list correctly", async () => {
    const eventsList = [
        {
          id: 1234, 
          image: '', 
          title: 'title1', 
          content: 'content goes here', 
          eventDateTime: 'Jan 1 1970', 
          description: 'description goes here', 
          createdAt: 'Jan 1 1970', 
          userFirstName: 'testly', 
          userLastName: 'test'
        }
      ];
    render(<EventsList eventsList={eventsList}/>);
    
    // Assert that the events list is rendered
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText('title1')).toBeInTheDocument();
    expect(screen.getByText('description goes here')).toBeInTheDocument();
  });
});