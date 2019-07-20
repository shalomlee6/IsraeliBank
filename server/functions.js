const https = require("https");
const fs = require("fs");
const xml2js = require("xml2js");
const parser = new xml2js.Parser();

let url =
  "https://www.boi.org.il/he/BankingSupervision/BanksAndBranchLocations/Lists/BoiBankBranchesDocs/snifim_dnld_he.xml";

function getXML() {
  let req = https.get(url, function(res) {
    let xml = "";

    res.on("data", function(xmlData) {
      xml += xmlData;
    });
    res.on("end", function() {
      parser.parseString(xml, function(error, result) {
        if (error === null) {
          console.log(JSON.stringify(xml));
          fs.appendFile("myfile.xml", xml, function(err) {
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

module.exports.getXML = getXML;
