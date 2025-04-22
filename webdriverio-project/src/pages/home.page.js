import BasePage from './base.page.js';

class HomePage extends BasePage {
    constructor() {
        super();
        this.buttonSelector = '.cookie-popup-with-overlay__buttons > button.cookie-popup-with-overlay__button-settings'; // Replace with the actual button selector
    }

    async clickButton() {
        const button = await $(this.buttonSelector);
        await button.waitForDisplayed(); // Ensure the button is visible before clicking
        await button.click();
    }
}

export default HomePage;