const { PORT, SALT_ROUND = '0', SECRET_TOKEN } = process.env;


const parsedSaltRound = parseInt(SALT_ROUND, 10);

export { PORT, parsedSaltRound as SALT_ROUND, SECRET_TOKEN };
