import { render, screen } from "@testing-library/react";
import EventsList from "../eventsList";

jest.mock("@app/lib/database", () => ({
    getEvents: jest.fn(() => Promise.resolve([])),
}));

describe("EventsList", () => {
    test("renders events list correctly", async () => {
        render(<EventsList />);
        
        // Wait for the events list to be fetched
        await screen.findByText("Loading...");

        // Assert that the events list is rendered
        expect(screen.getByRole("list")).toBeInTheDocument();
    });
});