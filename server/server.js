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
let username;
let score = 0;
let rank;

app.get("/statdetails", (req, res) => {
  res.json({ statDetails });
});

app.get("/leaderboard", (req, res) => {
  con.connect(function(err) {
    // if (err) throw err;
    con.query("Call GetLeaderboard()", function (err, result, fields) {
      if (err) throw err;
      leaderboard = result[0];
    });

    con.query("Call GetRanking('" + username + "', " + score + ")", function (err, result, fields) {
      if (err) throw err;
      rank = result[0];
    });
  });

  res.json({ leaderboard, rank });
});

app.post("/quizparameters", function(req, res){
  count = req.body.count;
  field = req.body.field;
  res.send("ok");

  con.connect(function(err) {
    // if (err) throw err;
    con.query("Call GetStat('" + field + "', '" + count + "')", function (err, result, fields) {
      if (err) throw err;
      statDetails = result[0][0];
    });
  });
});

app.post("/leaderboardparameters", function(req, res){
  username = req.body.username;
  score = req.body.score;
  res.send("ok");

  con.connect(function(err) {
    // if (err) throw err;
    con.query("Call SaveScore('" + username + "', " + score + ")", function (err) {
      if (err) throw err;
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
