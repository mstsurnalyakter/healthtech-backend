export const config = {
    DATABASE_URL: process.env.DATABASE_URL!,
    NODE_ENV: process.env.NODE_ENV!,
    PORT: process.env.PORT!,
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN!,
    SALT_ROUNDS: process.env.SALT_ROUNDS!
}