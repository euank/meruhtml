function jsonRequest(type, url, data, cb) {
  if(typeof data == "function") {
    cb = data;
    data = null;
  }
  var req = new XMLHttpRequest();
  req.open(type, url, true);
  req.onerror = function() {
    cb("Connection error");
  };
  req.onload = function() {
    if (req.status >= 200 && req.status < 400){
      var data;
      try {
        data = JSON.parse(req.responseText);
      } catch(ex) {
        return cb(ex);
      }
      if(data.error) {
        return cb(data.error);
      }
      return cb(null, data);
    }
  };
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(data);
}

var button = document.querySelector("#invite");
button.onclick = function() {
  var email = document.querySelector("#addr").value;
  jsonRequest('POST', '/api/invite', JSON.stringify({email: email}), function(err,res) {
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
