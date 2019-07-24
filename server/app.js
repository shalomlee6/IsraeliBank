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
  //TODO => get XML file and save
  func.getXML();
  //ToDO => get XML Data
  func.getXMLData();
});

//Three endpoints
//First endpoint get bank names
app.post("/api/bank", (req, res) => {
  console.log(req.body.id);
  let names = func.showHints(req.body.id);
  res.json(names);
});

//Second endpoint get branch numbers according to bank name
app.post("/api/branch", (req, res) => {
  console.log(req.body.bank);
  let branchNames = func.getBranchNames(req.body.bank);
  res.json(branchNames);
  
});

//Thired endpoint get all the information regarding Banks according to` bank name and branch number
app.post("/api/bank/branch", (req, res) => {
  global.res = res;
  func.getData(req.body,function(data){
    res = global.res;
    res.json(data);
    console.log(data);
    
  });

  
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
