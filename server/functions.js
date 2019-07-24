const https = require("https");
const fs = require("fs");
const util = require('util');
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

function getXMLData() {

  //check if file exist
  if (fs.existsSync(path)) {
    fs.readFile(path, function(err, data) {
      if (err) {
        console.log("Error => " + err);
      } else {
        parser.parseString(data, function(error, result) {
          if (!error) {
            var temp = "";
            let bankObj = {};
            let bankNames = [];
            let branchNames = [];
            let arr = result.BRANCHES.BRANCH;

            for (var i = 0; i < arr.length; i++) {

              temp = (arr[i].Bank_Name)[0];

              if(!bankNames.includes(temp)){
                
                for(var j = 0; j < arr.length; j++){
                  if(
                    (arr[j].Bank_Name)[0] === temp && 
                    !branchNames.includes((arr[j].Branch_Name)[0]))
                    {
                      branchNames.push( (arr[j].Branch_Name)[0] );
                    }
                }

                bankNames.push(temp);
                bankObj[temp] = branchNames;
                branchNames = [];
              }
            }
            global.bankObj = bankObj;
            global.bankNames = bankNames;
          }
        });
      }
    });
  }
}

function showHints(value){
  
  let names = global.bankNames;
  
  var position = 0;
  var possible = "";
  var possibleNames = [];
  
  for(var i = 0; i < names.length; i++){

    possible = names[i];
    position = possible.search(/[\u0590-\u05FF]/);


    if(possible.charAt(position) === value){
      possibleNames.push(possible);
    }

  }

  return possibleNames;


}

function getBranchNames(bankName){
  let banks = global.bankObj;
  return banks[bankName];
}

function getData(obj,callback){

  let bankName = obj.bank;
  let branchName = obj.branch;
  
  if (fs.existsSync(path)){

    fs.readFile(path, function(err, data) {
      if (err) {
        console.log("Error => " + err);
      } else {
        parser.parseString(data, function(error, result) {
          if (!error) {
    
            var tempName = "";
            var tempBranch = ""
            
            let arr = result.BRANCHES.BRANCH;
    
            for (var i = 0; i < arr.length; i++) {
    
              tempName = (arr[i].Bank_Name)[0];
              tempBranch = (arr[i].Branch_Name)[0];
    
              if(tempName === bankName && tempBranch === branchName ){
                let returnObj = {
                  bankName:      bankName,
                  bankNumber:    (arr[i].Bank_Code)[0],
                  branchName:    (arr[i].Branch_Name)[0],
                  branchAddress: (arr[i].Branch_Address)[0],
                  zipCode:       (arr[i].Zip_Code)[0],
                  poBox:         (arr[i].POB)[0],
                  tel:           (arr[i].Telephone)[0],
                  faxNum:        (arr[i].Fax)[0],
                  tollFreeNum:   (arr[i].Free_Tel)[0],
                  handicapAccess:(arr[i].Handicap_Access)[0],
                  dayClosed:     (arr[i].day_closed)[0]
                }
                callback(returnObj);
             
              }
            }
            
          }
        });
      }
    });
  }
}




module.exports.getXML = getXML;
module.exports.getData = getData;
module.exports.showHints = showHints;
module.exports.getXMLData = getXMLData;
module.exports.getBranchNames = getBranchNames;


