export const PORT = process.env.PORT || 3000;
export const DB_PG_HOST = process.env.DB_PG_HOST;
export const DB_PG_NAME = process.env.DB_PG_NAME;
export const DB_PG_USERNAME = process.env.DB_PG_USERNAME;
export const DB_PG_PASSWORD = process.env.DB_PG_PASSWORD;
export const DB_PG_PORT = process.env.DB_PG_PORT;

export const USER_SECRET = process.env.USER_SECRET || 'hung123123';

console.log(PORT, DB_PG_HOST);
