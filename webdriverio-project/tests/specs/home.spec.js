import HomePage from '../../src/pages/home.page.js';
import { loadEnv } from '../helpers/envHelper.js';
import FunctionalTestWrapper from '../helpers/functionalTestWrapper.js';
import BookingPage from '../../src/pages/booking.page.js';

describe('Home Page Tests', () => {
    let homePage;
    let bookingPage;

    before(async () => {
        loadEnv(); // Load environment variables
        homePage = new HomePage();
        bookingPage = new BookingPage(); // Initialize BookingPage
    });

    it('should verify that the correct URL is loaded', async () => {
        await FunctionalTestWrapper.run(async () => {
            await homePage.navigateTo(process.env.BASE_URL); // Navigate to the base URL
            const currentUrl = await browser.getUrl(); // Get the current URL
            expect(currentUrl).toBe('https://www.ryanair.com/' + "ie/en"); // Assert that the URL matches with the expected Ryanair URL
        });
    });

    it('should click the button and perform the action', async () => {
        await FunctionalTestWrapper.run(async () => {
            await homePage.navigateTo(process.env.BASE_URL); // Navigate to the base URL from environment variables
            await homePage.clickButton();
            // Add assertions to verify the action performed after button click
            console.log('Button clicked successfully');
        });
    });

    it('should select a destination, departure and return dates, and 2 adults as passengers', async () => {
        await FunctionalTestWrapper.run(async () => {
            // Select destination
            await homePage.selectDestination('France'); // Selecting France as the destination
    
            // Select departure and return dates
            await homePage.selectDepartureDate('2025-09-08');
            await homePage.selectReturnDate('2025-09-12'); 
    
            // Select 2 adults as passengers
            await homePage.selectPassengers(2);
    
            // Verify the selected destination
            const destinationInput = await $(homePage.destinationSearchBarSelector);
            const selectedDestination = await destinationInput.getValue();
            expect(selectedDestination).toBe('Nice'); // Airport destination should be 'Nice'
            console.log('Destination verified successfully: Nice');
    
            // Verify the selected dates
            const actualDates = await homePage.getSelectedDates(); // Retrieve the actual selected dates
            console.log(`Actual selected dates: Departure - ${actualDates.departure}, Return - ${actualDates.return}`);
    
            // Adjust expected dates to match the format retrieved from the UI
            const expectedDeparture = 'Depart Mon, 8 Sept';
            const expectedReturn = 'Return Fri, 12 Sept';
    
            if (actualDates.departure !== expectedDeparture || actualDates.return !== expectedReturn) {
                console.error(
                    `Date verification failed. Expected: '${expectedDeparture}' to '${expectedReturn}', but got: '${actualDates.departure}' to '${actualDates.return}'`
                );
            }
            expect(actualDates.departure).toBe(expectedDeparture);
            expect(actualDates.return).toBe(expectedReturn);
            console.log('Dates verified successfully: 2025-09-08 to 2025-09-12');
    
            // Verify the passengers' summary
            const isPassengersCorrect = await homePage.verifyPassengers('2 Adults');
            expect(isPassengersCorrect).toBe(true); // Assert that the passengers' summary is correct
            console.log('Passengers verified successfully: 2 Adults');
    
            // Click the search button
            await homePage.clickSearchButton();
        });
    });

    it('should complete the booking process with 2 passengers', async () => {
        await FunctionalTestWrapper.run(async () => {
            // Select departure and return flights
            await bookingPage.selectDepartureFlight();
            await bookingPage.selectReturnFlight();

            // Select flights and choose a fare
            await bookingPage.chooseRegularFare();

            // Check if the passengers section is disabled
            const isDisabled = await bookingPage.isPassengersSectionDisabled();
            expect(isDisabled).toBe(true);

            // Handle the "Log in to myRyanair" section
            await bookingPage.clickLoginLater();

            // Add 2 passengers
            const passengers = [
                { title: 'Mr', firstName: 'John', lastName: 'Doe' },
                { title: 'Ms', firstName: 'Jane', lastName: 'Smith' }
            ];
            await bookingPage.addPassengers(passengers);

            // Click continue
            await bookingPage.clickContinue();

            // Choose seats for 2 passengers
            await bookingPage.chooseSeats(2);

            // Proceed to the next flight section
            await bookingPage.clickNextFlight();

            // Choose seats for the return flight
            await bookingPage.chooseSeats(2);

            // Click continue
            await bookingPage.clickContinue();
        });
    });
});