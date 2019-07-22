const https = require("https");
const fs = require("fs");
const xml2js = require("xml2js");
const parser = new xml2js.Parser();
const path = "./server/xml/myfile.xml";
let url =
  "https://www.boi.org.il/he/BankingSupervision/BanksAndBranchLocations/Lists/BoiBankBranchesDocs/snifim_dnld_he.xml";

function getXML() {
  //check if file exist
  if (fs.existsSync(path)) {
    console.log("file alredy exist");
  } else {
    let req = https.get(url, function(res) {
      let xml = "";
      res.on("data", function(xmlData) {
        xml += xmlData;
      });
      res.on("end", function() {
        parser.parseString(xml, function(error, result) {
          if (error === null) {
            console.log(result["BRANCH"]);

            fs.appendFile("./server/xml/myfile.xml", xml, function(err) {
              if (err) {
                throw err;
              } else {
                console.log("File Saved!");
              }
            });
          } else {
            console.log(error);
          }
        });
      });
    });
  }
}

function showHints(name) {
  var bankNames = [];
  //check if file exist
  if (fs.existsSync(path)) {
    fs.readFile(path, function(err, data) {
      if (err) {
        console.log("Error => " + err);
      } else {
        parser.parseString(data, function(error, result) {
          if (!error) {
            var bank = "";
            let size = JSON.stringify(result).length;
            console.log(size);
            console.log(result.getElementsByTagName);
            for (var i = 0; i < 1; i++) {
              if (!bankNames.includes(result.BRANCHES.BRANCH[i].Bank_Name[0])) {
                bankNames.push(result.BRANCHES.BRANCH[i].Bank_Name[0]);
                console.log(bankNames[i]);
              }
            }
          }
        });
      }
    });
  }
}

module.exports.getXML = getXML;
module.exports.showHints = showHints;
