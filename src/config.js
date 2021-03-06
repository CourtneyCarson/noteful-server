module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresl://dunder_mifflin@localhost/noteful',
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresl://dunder_mifflin@localhost/noteful-test',
	API_TOKEN: process.env.API_TOKEN || "dummy-api-token",
}