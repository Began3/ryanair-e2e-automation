import BasePage from './base.page.js';

class HomePage extends BasePage {
    constructor() {
        super();
        this.buttonSelector = 'button*=Yes, I agree'; // Accept Cookies button
        this.destinationSearchBarSelector = '#input-button__destination'; // Selector for destination search bar
        this.destinationOptionSelector = 'span.countries__country-inner'; // Selector for destination options
        this.airportSelector = '//span[contains(normalize-space(.), "Nice")]'; // Selector for airport options
        this.departureDateSelector = '[uniqueid="dates-from"]'; // Selector for departure date
        this.returnDateSelector = '[uniqueid="dates-to"]'; // Selector for return date
        this.monthSelector = '.m-toggle__month'; // Selector for month elements
        this.passengersSelector = '[uniqueid="passengers"]'; // Selector for passengers input
        this.addAdultButtonSelector = '.counter__button-wrapper--enabled'; // Selector for adding adults
        this.confirmPassengersButtonSelector = 'button.passengers__confirm-button[aria-label="Done"]'; // Selector for confirming passengers
        this.searchButtonSelector = 'button.flight-search-widget__start-search-cta.ng-tns-c2866684587-3.ry-button--gradient-yellow'; // Selector for search button
    }

    async clickButton() {
        const button = await $(this.buttonSelector);
        await button.waitForDisplayed(); // Ensure the button is visible before clicking
        await button.click();
    }

    async selectDestination() {
        const destinationInput = await $(this.destinationSearchBarSelector);
        await destinationInput.waitForDisplayed();
        await destinationInput.click();
        
        // Use the destinationOptionSelector to find the element containing "France"
        const destinationOption = await $(`${this.destinationOptionSelector}*=France`);
        await destinationOption.waitForDisplayed();
        await destinationOption.click();
    
        // Use the airportSelector to find the airport containing "Nice"
        const airportOption = await $(this.airportSelector);
        await airportOption.waitForDisplayed();
        await airportOption.click();
    }

    async selectDepartureDate(date) {
        const departureDateInput = await $(this.departureDateSelector);
        await departureDateInput.waitForDisplayed();
        await departureDateInput.click();

        // Find the month element containing "Sept"
        const monthElement = await $(`${this.monthSelector}*=Sept`);
        await monthElement.waitForDisplayed();

        // Click the month element
        await monthElement.click();

        // Select the specific date within the month
        const dateOption = await $(`//div[@data-id="${date}"]`);
        await dateOption.waitForDisplayed();
        await dateOption.click();
    }

    async selectReturnDate(date) {
        const returnDateInput = await $(`${this.monthSelector}*=Sept`);
        await returnDateInput.waitForDisplayed();
        await returnDateInput.click();

        // Select the specific return date
        const dateOption = await $(`//div[@data-id="${date}"]`);
        await dateOption.waitForDisplayed();
        await dateOption.click();
    }

    async selectPassengers(adults = 2) {
        const passengersInput = await $(this.passengersSelector);
        await passengersInput.waitForDisplayed();
        await passengersInput.click();
    
        // Reset the passenger count to 1 (default)
        const resetButton = await $(`${this.passengersSelector} .counter__button-wrapper--enabled[aria-label="Decrease number of adults"]`);
        while (await resetButton.isClickable()) {
            await resetButton.click();
        }
    
        // Add the required number of adults
        for (let i = 1; i < adults; i++) { // Start from 1 since 1 adult is already selected by default
            const addAdultButton = await $(this.addAdultButtonSelector);
            await addAdultButton.click();
        }
    
        const confirmPassengersButton = await $(this.confirmPassengersButtonSelector);
        await confirmPassengersButton.waitForClickable(); // Wait until the button is clickable
        await confirmPassengersButton.click();
    }
    async getSelectedDates() {
        const departureDateElement = await $(this.departureDateSelector);
        const returnDateElement = await $(this.returnDateSelector);

        // Retrieve and normalize the text from the elements
        const departureDate = (await departureDateElement.getText()).replace(/\s+/g, ' ').trim();
        const returnDate = (await returnDateElement.getText()).replace(/\s+/g, ' ').trim();

        return {
            departure: departureDate,
            return: returnDate,
        };
    }


    async verifyDates(departureDate, returnDate) {
        const departureDateInput = await $(this.departureDateSelector);
        const returnDateInput = await $(this.returnDateSelector);
        const selectedDepartureDate = await departureDateInput.getText();
        const selectedReturnDate = await returnDateInput.getText();
        return (
            selectedDepartureDate.includes(departureDate) &&
            selectedReturnDate.includes(returnDate)
        );
    }
    async verifyPassengers(expectedSummary) {
        const passengersSummaryElement = await $(this.passengersSelector);
        await passengersSummaryElement.waitForDisplayed(); // Ensure the element is visible
        const actualSummary = await passengersSummaryElement.getText(); // Retrieve the text from the element
        return actualSummary.includes(expectedSummary); // Check if the actual summary contains the expected summary
    }
    async clickSearchButton() {
        const searchButton = await $(this.searchButtonSelector);
        await searchButton.waitForDisplayed(); // Ensure the button is visible
        await searchButton.waitForClickable(); // Ensure the button is clickable
        await searchButton.click();
        console.log('Search button clicked successfully.');
    }
}

export default HomePage;