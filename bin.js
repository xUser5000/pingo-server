// setup env vars
require("dotenv").config();

const { app } = require("./src/app");
const { connect } = require("./src/database/mongo");

// setup the databse
connect()
  .then(() => {
    console.log("MongoDB Connected");

    // setup port
    const PORT = process.env["PORT"];

    // start the server
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch(error => console.log(error));
