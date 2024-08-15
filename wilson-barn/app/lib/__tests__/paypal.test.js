import {

getPaypalBearerToken,
createAndSendInvoice,
sendRentalInvoice,
sendMarketInvoice,
} from "../paypal";

describe("PayPal Functions", () => {
describe("getPaypalBearerToken", () => {
    it("should return a valid bearer token", async () => {
        const bearerToken = await getPaypalBearerToken();
        expect(bearerToken).toBeDefined();
        expect(typeof bearerToken).toBe("string");
    });
});

describe("createAndSendInvoice", () => {
    it("should create and send an invoice successfully", async () => {
        // Mock the necessary dependencies and inputs
        const items = [
            {
                name: "Barn Rental (6 hours)",
                description: "6 Hours of rental.",
                quantity: "1",
                unit_amount: {
                    currency_code: "USD",
                    value: "225.00",
                },
                unit_of_measure: "QUANTITY",
            },
        ];
        const customerInfo = {
            name: "John Doe",
            address: "123 Main St",
            email: "john.doe@example.com",
            phone: "1234567890",
        };

        // Call the function and assert the result
        const result = await createAndSendInvoice(items, customerInfo);
        expect(result).toBe(true);
    });
});

describe("sendRentalInvoice", () => {
    it("should send a rental invoice successfully", async () => {
        // Mock the necessary dependencies and inputs
        const rentalID = "123456";

        // Call the function and assert the result
        const result = await sendRentalInvoice(rentalID);
        expect(result).toBe(true);
    });
});

describe("sendMarketInvoice", () => {
    it("should send a market invoice successfully", async () => {
        // Mock the necessary dependencies and inputs
        const marketApplicationID = "789012";

        // Call the function and assert the result
        const result = await sendMarketInvoice(marketApplicationID);
        expect(result).toBe(true);
    });
});
});