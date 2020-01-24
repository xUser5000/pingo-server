const {
    clearDatabase,
    closeDatabase,
    connect
} = require('../src/database/mongo.memory')

/**
 * Connect to a new in-memory database before running any tests.
 */
before(async () => await connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await clearDatabase());

/**
 * Remove and close the db and server.
 */
after(async () => await closeDatabase());