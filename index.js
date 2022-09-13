// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const PORT = process.env.PORT || 3030;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// If /:date is empty
app.get("/api/", (req, res) => {
  unixTime = Date.now();
  objectTime = new Date(unixTime);
  readableTime = objectTime.toUTCString();

  res.json({"unix": unixTime, "utc": readableTime});
});

// If /:date is not empty
app.get("/api/:date", (req, res) => {
  date = req.params.date;
  // Match anything other than a letter, digit or underscore
  regex = /\W/;

  // Check if date is invalid
  if (new Date(date) == "Invalid Date" && new Date(Number(date)) == "Invalid Date") {
    res.json({"error": "Invalid Date"});
  } else {
    // If any date except Unix time
    if (regex.test(date)) {
      objectTime = new Date(date);
      unixTime = objectTime.getTime();
    } else {
      // If date is Unix time
      unixTime = Number(date);
      objectTime = new Date(unixTime);
    }

    readableTime = objectTime.toUTCString();

    res.json({"unix": unixTime, "utc": readableTime});
  }
});

// listen for requests :)
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
