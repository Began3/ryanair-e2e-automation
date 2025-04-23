import BasePage from './base.page.js';

class BookingPage extends BasePage {
    constructor() {
        super();
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
            seatButtonSelector: 'seat-03A', // Seat selection button
            nextFlightButtonSelector: 'seat-03A', // Next flight button
            passengerSummarySelector: '.passenger-summary', // Passenger summary
            selectedSeatsSelector: '.selected-seat', // Selected seats
        };
    }

    async selectDepartureFlight() {
        const departureFlight = await $(this.selectors.departureFlightSelector);
        await departureFlight.waitForClickable();
        await departureFlight.click();
    }

    async selectReturnFlight() {
        const returnFlight = await $(this.selectors.returnFlightSelector);
        await returnFlight.waitForClickable();
        await returnFlight.click();
    }

    async chooseRegularFare() {
        const regularFareButton = await $(this.selectors.regularFareButtonSelector);
        await regularFareButton.waitForClickable();
        await regularFareButton.click();
    }

    async isPassengersSectionDisabled() {
        const passengersSection = await $(this.selectors.passengersSectionSelector);
        const isDisabled = await passengersSection.getAttribute('class');
        return isDisabled !== null;
    }

    async clickLoginLater() {
        const loginLaterButton = await $(this.selectors.loginLaterButtonSelector);
        await loginLaterButton.waitForClickable();
        await loginLaterButton.click();
    }

    async addPassengers(passengers) {
        for (let i = 0; i < passengers.length; i++) {
            // Dynamically construct selectors for each passenger
            const firstNameInputSelector = `[name="form.passengers.ADT-${i}.name"]`;
            const lastNameInputSelector = `[name="form.passengers.ADT-${i}.surname"]`;
    
            // Locate the input fields for the current passenger
            const titleDropdown = await $$(this.selectors.titleDropdownSelector)[i];
            const firstNameInput = await $(firstNameInputSelector);
            const lastNameInput = await $(lastNameInputSelector);
    
            // Ensure the input fields exist for the current passenger
            if (titleDropdown && firstNameInput && lastNameInput) {
                // Click the title dropdown
                await titleDropdown.click();
    
                // Select the title from the dropdown menu
                const titleOption = await $(`button*= ${passengers[i].title}`);
                await titleOption.click();
    
                // Set the first and last names
                await firstNameInput.setValue(passengers[i].firstName);
                await lastNameInput.setValue(passengers[i].lastName);
            } else {
                console.warn(`Input fields for passenger at index ${i} are missing or not rendered.`);
            }
        }
    }
    async clickContinue() {
        const continueButton = await $(this.selectors.continueButtonSelector);
        await continueButton.waitForClickable();
        await continueButton.click();
    }

    async chooseSeats(seatCount) {
        for (let i = 0; i < seatCount; i++) {
            // Dynamically construct the seat selector based on the index
            const seatId = `seat-03${String.fromCharCode(65 + i)}`; // 'A', 'B', 'C', etc.
            const seatButton = await $(`#${seatId}`);
    
            // Wait for the seat button to be clickable and click it
            await seatButton.waitForClickable();
            await seatButton.click();
        }
    }

    async clickNextFlight() {
        const nextFlightButton = await $(this.selectors.nextFlightButtonSelector);
        await nextFlightButton.waitForClickable();
        await nextFlightButton.click();
    }
}

export default BookingPage;