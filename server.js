var express = require("express");
var path = require("path");
var cnx = require("./db/connection");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./html/index.html"));
});

app.get("/reserve", (req, res) => {
  res.sendFile(path.join(__dirname, "./html/reserve.html"));
});

app.get("/tables", (req, res) => {
  res.sendFile(path.join(__dirname, "./html/tables.html"));
});

//get api for all current reservations 
app.get("/api/tables", (req, res) => {
  const sqlString = "SELECT * FROM tables where isWaiting=0";
  cnx.query(sqlString, function (err, dbreservations) {
    res.json(dbreservations);
  });
});
//get api for all waiting 
app.get("/api/waitlist", (req, res) => {
  const sqlString = "SELECT * FROM tables where isWaiting=1";
  cnx.query(sqlString, function (err, dbreservations) {
    res.json(dbreservations);
  });
});

//post api
app.post("/api/tables", (req, res) => {

  console.log("req.body:", req.body);
  //check how many tables are seated
  //let isWaiting;
  cnx.query("SELECT count(*) FROM tables where isWaiting = 0 having count(isWaiting)>5", (err, availability) => {
    //if there is not data then proceed to the following
    if (err) {
      console.log("Here: "+err);
      res.status(400).json(err);
    };
    //determines the value of isWaiting
    req.body.isWaiting=(!availability) ? 1 : 0;
    //insert the new table
    cnx.query("INSERT INTO tables SET ?", req.body, (err, result) => {
      if (err) {
        console.log("There: "+err);
        res.status(400).json(err);
      };
  
      res.json(result);
    });
  });  

});


//caution this fires up the "server"
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});