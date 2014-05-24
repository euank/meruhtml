var button = document.querySelector("#go");

button.onclick = function() {
  var data = {};
  ['domain', 'username', 'password', 'setup_pass'].forEach(function(item) {
    data[item] = document.querySelector('#' + item).value;
  });

  jsonRequest('POST', '/api/initial_setup', data, function(err,res) {
    if(err) {
      alert(err);
    } else if(res.ok) {
      alert("All good. Go home and login");
    } else {
      alert(JSON.stringify(res));
    }
  });
};
