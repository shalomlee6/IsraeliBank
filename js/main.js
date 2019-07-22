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
  fetch("http://localhost:3000/api/bank", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: value })
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      console.log("data from server => " + data.id);
    });
}




