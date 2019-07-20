const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const getXML = require("./functions");
const router = express.Router();

//homepage route
app.get("/", (req, res) => {
  //TODO => get XML and send to the client
  //getXML();
  res.send("shalom");
});

//Three endpoints

//First endpoint get bank names
app.get("/api/bank/:name", (req, res) => {
  res.send(req.params.name);
});

//Second endpoint get branch numbers according to bank name/number
app.get("/api/branch/:bankNum/:bankName", (req, res) => {
  res.send(req.params.bankNum);
  res.send(req.params.bankName);
});

//Thired endpoint get all the information regarding Banks according to bank name and branch number
app.get("/api/banks/:bankName&:branchNum", (req, res) => {
  res.send(req.params.name);
  res.send(req.params.branchNum);
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
