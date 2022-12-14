const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();//tao bien global trong .env

const app = express();
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse requests of content-type - application/json
app.use(express.json());

// set port, listen for requests
require("./routes/index.js")(app);

const db = require("./models");
db.sequelize.sync();

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});