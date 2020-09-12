const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

let mongoServer;

beforeEach(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts, err => {
    if (err) console.error(err);
  });
});

afterEach(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});
