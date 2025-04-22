export default class FunctionalTestWrapper {
    static async run(testFn) {
        try {
            await testFn();
        } catch (error) {
            console.error('Test failed:', error);
            throw error;
        }
    }
}