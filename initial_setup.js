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

var button = document.querySelector("#go");

button.onclick = function() {
  var data = {};
  ['domain', 'username', 'password', 'setup_pass'].forEach(function(item) {
    data[item] = document.querySelector('#' + item).value;
  });

  jsonRequest('POST', '/api/initial_setup', JSON.stringify(data), function(err,res) {
    if(err) {
      alert(err);
    } else if(res.ok) {
      alert("All good. Go home and login");
    } else {
      alert(JSON.stringify(res));
    }
  });
};
