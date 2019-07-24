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
        showBankResult(data);
        console.log(data);
        console.log(JSON.stringify(data) );
      });
  }


}

function showBankResult(data){
    let output = document.getElementById("output");

    var child ;

    data.forEach(element => {
      child = document.createElement("DIV");
      child.innerHTML = "<h4>" + data.bankName + "</h4>"
      output.appendChild(child);
    });


}