const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();

const port = 9000;

app.use(cors(), bodyParser.json());
app.listen(port, () => console.log(`Server running on port ${port}`));
