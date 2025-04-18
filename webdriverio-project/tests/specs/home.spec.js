import HomePage from '../../src/pages/home.page';
const { loadEnv } = require('../helpers/envHelper');
const FunctionalTestWrapper = require('../helpers/functionalTestWrapper'); // Import FunctionalTestWrapper

describe('Home Page Tests', () => {
    let homePage;

    before(async () => {
        loadEnv(); // Load environment variables
        homePage = new HomePage();
    });

    it('should verify that the correct URL is loaded', async () => {
        await FunctionalTestWrapper.run(async () => {
            await homePage.navigateTo(process.env.BASE_URL); // Navigate to the base URL
            const currentUrl = await browser.getUrl(); // Get the current URL
            expect(currentUrl).toBe('https://www.ryanair.com/'+"ie/en"); // Assert that the URL matches with the expected Ryanair URL
        });
    });

    it('should display the correct title', async () => {
        await FunctionalTestWrapper.run(async () => {
            await homePage.navigateTo(process.env.BASE_URL); // Navigate to the base URL from environment variables
            const title = await homePage.getTitle();
            expect(title).toBe('Official Ryanair website | Cheap flights from Ireland | Ryanair'); // Validate the title (hardcoded)
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
});