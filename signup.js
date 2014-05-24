function queryObj() {
  var result = {}, keyValuePairs = location.search.slice(1).split('&');
  keyValuePairs.forEach(function(keyValuePair) {
    keyValuePair = keyValuePair.split('=');
    result[keyValuePair[0]] = keyValuePair[1] || '';
  });
  return result;
}

function setInvalid() {
  var invalid = document.querySelector("#invalid");
  invalid.classList.remove("hide");
}

function setDomain(val) {
  var d= document.querySelector("#domain");
  d.textContent = "@"+val;
  d.classList.remove('hide');
}

var q = queryObj();
if(!q.invite) {
  setInvalid();
} else {
  jsonRequest('GET', '/api/domain?id=' + encodeURIComponent(q.domain), function(err, res) {
    if(err) { console.log(err); return setInvalid(); }
    setDomain(res.name);
  });
}

var button = document.querySelector("#signup");

button.onclick = function() {
  var pass = document.querySelector("#password").value;
  var name = document.querySelector("#name").value;
  var invite = q.invite;
  var domain = q.domain;
  jsonRequest('POST', '/api/account', {invite: invite, user:name, password:pass, domain:domain}, function(err,res) {
    if(err) {
      console.log(err);
      alert(err);
    } else if(res.ok) {
      alert("sent ;) (your account was made successfully)");
    } else {
      alert("AHHH");
    }
  });
};
