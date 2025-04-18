class BasePage {
    constructor() {
        this.timeout = 5000; // default timeout for waiting
    }

    async navigateTo(url) {
        await browser.url(url);
    }

    async waitForElement(selector) {
        await browser.waitUntil(async () => {
            return (await $(selector).isDisplayed());
        }, {
            timeout: this.timeout,
            timeoutMsg: `Element ${selector} not displayed after ${this.timeout}ms`
        });
    }
}

export default BasePage;