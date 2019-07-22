const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const http = require("http");
const func = require("./functions");
const port = process.env.PORT || 3000;
// const jsonParser = bodyParser.json();
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//homepage route
app.get("/api", (req, res) => {
  //TODO => get XML and send to the client
  func.getXML();
  //ToDO => Send data to client
});

//Three endpoints
//First endpoint get bank names
app.post("/api/bank", (req, res) => {
  console.log(req.body.id);
  func.showHints(req.body.id);
  res.json(req.body);
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
