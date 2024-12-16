const express = require("express");
const mysql = require("mysql");
const app = express();
const signup = require("./routes/signup");
const bodyParser = require("body-parser");

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/signup", signup);
app.use(bodyParser.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "testdb",
});
db.connect((err) => {
  if (
    (err) => {
      console.error("error connecting to mysql", err);
      return;
    }
  )
    console.log("connected to mysql");
});

const port = 3000;
app.listen(port, () => {
  console.log("connection established");
});
