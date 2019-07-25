const hint = document.getElementById("hint");


function getXML() {
  fetch("http://localhost:3000/api")
    .then(function(res) {
      // Transform the data into json
      return res.json();
    })
    .then(function(data) {
      console.log(JSON.stringify(data.done));
    });
}

function showHint(value) {
  console.log("my value => " + value);
  // if(!value){return}
  fetch("http://localhost:3000/api/bank", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: value })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      showResult(data);
      // dropdownList(document.getElementById("bankInput"), data);
      console.log(data);
      console.log(JSON.stringify(data) );
    });
}

function showResult(arr){
  let hintList = document.getElementById("hintlist");
  var child ;

  arr.forEach(element => {
    child = document.createElement("option");
    child.setAttribute("value",element);
    hintList.appendChild(child);
  });
  

}

function showBranch(){
  let val = document.getElementById("bankInput").value;

  if(val != ""){
    fetch("http://localhost:3000/api/branch", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bank: val })
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        showBranchResult(data);
        // dropdownList(document.getElementById("bankInput"), data);
        console.log(data);
        console.log(JSON.stringify(data) );
      });
  }



}

function showBranchResult(arr){
  let branchlist = document.getElementById("branchlist");
  var child ;

  arr.forEach(element => {
    child = document.createElement("option");
    child.setAttribute("value",element);
    branchlist.appendChild(child);
  });
  
}

function getIsraeliBankData(){
  
  let bankName = document.getElementById("bankInput").value;
  let branchName = document.getElementById("branchInput").value;
  
  if(bankName != "" && branchName != "" ){
    let obj = {bank: bankName, branch: branchName};
    console.log(obj);
    fetch("http://localhost:3000/api/bank/branch", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj)
    })
      .then(res => {
        console.log("aaaaaaa",res)
        return res.json();
      })
      .then(data => {
        // console.log(data);
        console.log(JSON.stringify(data) );
        showBankResult(data);
        // console.log(data);
        // console.log(JSON.stringify(data) );
      }).catch(err => {
        console.log(err);
      });
  }


}

function showBankResult(data){

  let output = document.getElementById("output-data");
  
  let  bankNumber =  document.createElement("td");
  bankNumber.innerHTML =     data.bankNumber;
  output.appendChild(bankNumber);

  let  branchName = document.createElement("td");
  branchName.innerHTML =     data.branchName;
  output.appendChild(branchName);
  
  let  branchAddress =  document.createElement("td");
  branchAddress.innerHTML =  data.branchAddress;
  output.appendChild(branchAddress);

  let  zipCode = document.createElement("td");       
  zipCode.innerHTML =   data.zipCode;
  output.appendChild(zipCode);

  let  poBox  = document.createElement("td");
  poBox.innerHTML =     data.poBox;
  output.appendChild(poBox);
  
  let  telephone = document.createElement("td");     
  telephone.innerHTML = data.telephone;
  output.appendChild(telephone);

  let  faxNum = document.createElement("td");        
  faxNum.innerHTML = data.faxNum;
  output.appendChild(faxNum);

  let  tollFreeNum = document.createElement("td");    
  tollFreeNum.innerHTML = data.tollFreeNum;
  output.appendChild(tollFreeNum);

  let  handicapAccess = document.createElement("td"); 
  handicapAccess.innerHTML = data.handicapAccess;
  output.appendChild(handicapAccess);

  let  dayClosed = document.createElement("td");     
  dayClosed.innerHTML = data.dayClosed;    
  output.appendChild(dayClosed);

  


}