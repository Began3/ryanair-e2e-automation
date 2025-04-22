import dotenv from 'dotenv';

export function loadEnv() {
    const result = dotenv.config();
    if (result.error) {
        throw result.error;
    }
    return result.parsed;
}