const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

var mysql = require('mysql');

var con = mysql.createConnection({
    host: '127.0.0.1',
    user: "root",
    password: "",
    database: "statquizdb"
});

let statDetails = "";
let leaderboard;
let count;
let field;

app.get("/statdetails", (req, res) => {
  res.json({ statDetails });
});

app.get("/leaderboard", (req, res) => {
  con.connect(function(err) {
    // if (err) throw err;
    con.query("Call GetLeaderboard()", function (err, result, fields) {
      if (err) throw err;
      leaderboard = result[0];
      console.log(leaderboard)
    });
  });

  res.json({ leaderboard });
});

app.post("/parameters", function(req, res){
  count = req.body.count;
  field = req.body.field;
  console.log([count, field]);
  res.send("ok");

  con.connect(function(err) {
    // if (err) throw err;
    con.query("Call GetStat('" + field + "', '" + count + "')", function (err, result, fields) {
      if (err) throw err;
      statDetails = result[0][0];
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
