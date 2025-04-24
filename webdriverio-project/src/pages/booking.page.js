import BasePage from './base.page.js';

class BookingPage extends BasePage {
    constructor() {
        super();
        // Define all selectors used in this page
        this.selectors = {
            flightDetailsSelector: '.details__header--left.ng-tns-c767722289-1', // Main flight details container
            departureLocationSelector: '.button.flight-card-summary__select-btn.ng-tns-c511344216-26.ry-button--gradient-blue', // Departure location
            destinationLocationSelector: '.details__header-details h4:nth-of-type(2)', // Destination location
            returnDetailsSelector: '.details__bottom-bar', // Return dates and passenger count
            departureFlightSelector: 'button*=Select', // Selector for departure flight
            returnFlightSelector: 'button*=Select', // Selector for return flight
            regularFareButtonSelector: '[data-e2e="fare-card-regular"]', // Regular fare button
            passengersSectionSelector: '.form-wrapper--disabled', // Passengers section disabled
            loginLaterButtonSelector: 'span*=Log in later', // Login later button
            titleDropdownSelector: 'button.dropdown__toggle', // Title dropdown
            firstNameInputSelector: '[name="form.passengers.ADT-0.name"]', // First name input
            lastNameInputSelector: '[name="form.passengers.ADT-0.surname"]', // Last name input
            continueButtonSelector: 'button.continue-flow__button*=Continue', // Continue button
            nextFlightButtonSelector: 'button.passenger-carousel__cta*=Next flight', // Next flight button
            noThanksReserveSeatsSelector: '[class="_container icon-16"]', // No thanks button for reserving the same seats
            passengerSummarySelector: '.passenger-summary', // Passenger summary
            finalContinueButtonSelector: 'button*=Continue', // Final Continue button
        };
    }

    // Select the departure flight
    async selectDepartureFlight() {
        const departureFlight = await $(this.selectors.departureFlightSelector);
        await departureFlight.waitForClickable(); // Wait until the button is clickable
        await departureFlight.click(); // Click the departure flight button
    }

    // Select the return flight
    async selectReturnFlight() {
        const returnFlight = await $(this.selectors.returnFlightSelector);
        await returnFlight.waitForClickable(); // Wait until the button is clickable
        await returnFlight.click(); // Click the return flight button
    }

    // Choose the regular fare option
    async chooseRegularFare() {
        const regularFareButton = await $(this.selectors.regularFareButtonSelector);
        await regularFareButton.waitForClickable(); // Wait until the button is clickable
        await regularFareButton.click(); // Click the regular fare button
    }

    // Check if the passengers section is disabled
    async isPassengersSectionDisabled() {
        const passengersSection = await $(this.selectors.passengersSectionSelector);
        const isDisabled = await passengersSection.getAttribute('class'); // Check the class attribute
        return isDisabled !== null; // Return true if the section is disabled
    }

    // Click the "Log in later" button
    async clickLoginLater() {
        const loginLaterButton = await $(this.selectors.loginLaterButtonSelector);
        await loginLaterButton.waitForClickable(); // Wait until the button is clickable
        await loginLaterButton.click(); // Click the "Log in later" button
    }

    // Add passenger details
    async addPassengers(passengers) {
        for (let i = 0; i < passengers.length; i++) {
            const firstNameInputSelector = `[name="form.passengers.ADT-${i}.name"]`;
            const lastNameInputSelector = `[name="form.passengers.ADT-${i}.surname"]`;

            const titleDropdown = await $$(this.selectors.titleDropdownSelector)[i];
            const firstNameInput = await $(firstNameInputSelector);
            const lastNameInput = await $(lastNameInputSelector);

            if (titleDropdown && firstNameInput && lastNameInput) {
                await titleDropdown.click(); // Open the title dropdown
                const titleOption = await $(`button*= ${passengers[i].title}`);
                await titleOption.click(); // Select the title
                await firstNameInput.setValue(passengers[i].firstName); // Enter the first name
                await lastNameInput.setValue(passengers[i].lastName); // Enter the last name
            } else {
                console.warn(`Input fields for passenger at index ${i} are missing or not rendered.`);
            }
        }
    }

    // Click the "Continue" button
    async clickContinue() {
        const continueButton = await $(this.selectors.continueButtonSelector);
        await continueButton.waitForClickable(); // Wait until the button is clickable
        await continueButton.click(); // Click the "Continue" button
    }

    // Choose a random seat from the seat map
    async chooseRandomSeat() {
        // Generate the seat map dynamically
        const seatMap = [];
        const rows = Array.from({ length: 34 }, (_, i) => (i + 2).toString().padStart(2, '0')); // Rows 02 to 35
        const columns = ['A', 'B', 'C', 'D', 'E', 'F']; // Columns A to F

        rows.forEach(row => {
            columns.forEach(column => {
                seatMap.push(`#seat-${row}${column}`);
            });
        });

        let seatSelected = false;
        const timeout = 10000; // Timeout in milliseconds (10 seconds)
        const startTime = Date.now();

        while (!seatSelected && seatMap.length > 0) {
            // Check if the timeout has been reached
            if (Date.now() - startTime > timeout) {
                throw new Error('Timeout reached while attempting to select a seat.');
            }

            // Pick a random seat from the seat map
            const randomIndex = Math.floor(Math.random() * seatMap.length);
            const randomSeatSelector = seatMap[randomIndex];

            try {
                const seat = await $(randomSeatSelector);
                if (await seat.isClickable()) {
                    await seat.waitForClickable({ timeout: 5000 });
                    await seat.click(); // Click the seat
                    console.log(`Seat ${randomSeatSelector} selected.`);
                    seatSelected = true;
                } else {
                    console.warn(`Seat ${randomSeatSelector} is not clickable. Removing from seat map.`);
                    seatMap.splice(randomIndex, 1); // Remove the seat from the map
                }
            } catch (error) {
                console.error(`Error selecting seat ${randomSeatSelector}:`, error);
                seatMap.splice(randomIndex, 1); // Remove the seat from the map
            }
        }

        if (!seatSelected) {
            throw new Error('No available seats could be selected.');
        }
    }

    // Click the "Next Flight" button
    async clickNextFlight() {
        const nextFlightButton = await $(this.selectors.nextFlightButtonSelector);
        await nextFlightButton.waitForDisplayed({ timeout: 10000 }); // Wait for the button to be displayed
        await nextFlightButton.waitForClickable({ timeout: 10000 }); // Wait for the button to be clickable
        await nextFlightButton.click(); // Click the "Next Flight" button
        console.log('Next flight button clicked.');
    }

    // Click the "No Thanks" button for reserving seats
    async clickNoThanksReserveSeats() {
        const noThanksButton = await $(this.selectors.noThanksReserveSeatsSelector);

        // Wait for the button to be displayed
        await noThanksButton.waitForDisplayed({ timeout: 30000 });

        // Ensure the button is clickable
        await noThanksButton.waitForClickable({ timeout: 30000 });

        // Scroll into view if necessary
        await noThanksButton.scrollIntoView();

        // Click the button
        await noThanksButton.click();
        console.log('No thanks button clicked.');
    }

    // Click the final "Continue" button
    async clickFinalContinue() {
        const finalContinueButton = await $(this.selectors.finalContinueButtonSelector);
        await finalContinueButton.waitForDisplayed({ timeout: 10000 }); // Wait for the button to be displayed
        await finalContinueButton.waitForClickable({ timeout: 10000 }); // Wait for the button to be clickable
        await finalContinueButton.click(); // Click the final "Continue" button
        console.log('Final continue button clicked.');
    }
}

export default BookingPage;