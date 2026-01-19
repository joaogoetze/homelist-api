import dotenv from 'dotenv';

dotenv.config();

function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing enviroment variable: ${name}`);
    }

    return value;
}

export const env = {
    port: Number(getEnv('PORT')),
};