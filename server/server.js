require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Middleware to parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let statDetails = "";
let leaderboard;
let username;
let score = 0;
let rank;

const pool = new Pool({
  host: process.env.Host,
  port: process.env.Port,
  user: process.env.User,
  password: process.env.Password,
  database: process.env.Database,
});

// Gets the stat details
app.get("/statdetails", async (req, res) => {
  try {
    res.json({ statDetails });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Gets the leaderboard details and the user's ranking
app.get("/leaderboard", async (req, res) => {
  try {
    const client = await pool.connect();
    const leaderboardResult = await client.query('Select * From GetLeaderboard()');
    const rankResult = await client.query("Select * From GetRanking(" + score + ")");
    
    leaderboard = leaderboardResult.rows;
    rank = rankResult.rows[0];
    client.release();

    res.json({ leaderboard, rank });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Post the questions details based on the quiz type and question number
app.post('/quizparameters', async (req, res) => {
  try {
    const data = req.body;
    const client = await pool.connect();
    const result = await client.query("Select * From GetStat('" + data.field + "', '" + data.count + "')");
    client.release();

    statDetails = result.rows[0];

    res.json({ success: true, message: 'Data posted successfully' });
  } catch (error) {
    console.error('Error with quiz parameters:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Post the user's score to the database
app.post("/leaderboardparameters", async (req, res) => {
  try {
    username = req.body.username;
    score = req.body.score;
    const client = await pool.connect();
    await client.query("Select * From SaveScore('" + username + "', " + score + ")");
    client.release();

    res.json({ success: true, message: 'Data posted successfully' });
  } catch (error) {
    console.error('Error with leaderboard parameters:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
