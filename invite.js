var button = document.querySelector("#invite");
button.onclick = function() {
  var email = document.querySelector("#addr").value;
  jsonRequest('POST', '/api/invite', {email: email}, function(err,res) {
    if(err) {
      console.log(err);
      alert(err);
    } else if(res.ok) {
      alert("You should have an invite in your inbox. Use it wisely");
    } else {
      alert("UNKNOWN ERROR" + res);
    }
  });
};
