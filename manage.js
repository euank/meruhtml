var qs = function(selector) {
  return document.querySelector(selector);
};

function getCookie(key) {
  return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

function rmCookie(key) {
  document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

function jsonRequest(type, url, data, cb) {
  if(typeof data == "function") {
    cb = data;
    data = null;
  } else if(typeof data === 'object') {
    data = JSON.stringify(data);
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

var els = {};
["loadingdiv", "logindiv", "managediv"].forEach(function(el) {
  els[el] = qs('#' + el);
});

function hideAll() {
  Object.keys(els).forEach(function(elkey) {
    els[elkey].classList.add('hide');
  });
}
function showLoginBox() {
  hideAll();
  els.logindiv.classList.remove('hide');
}
function showManageBox() {
  hideAll();
  els.managediv.classList.remove('hide');
}

function checkLoggedIn() {
  if(getCookie('session')) {
    jsonRequest('GET', '/api/login', function(err, res) {
      if(err) return alert(err);
      if(!res.logged_in) {
        return showLoginBox();
      } else {
        return showManageBox();
      }
    });
  } else {
    showLoginBox();
  }
}
checkLoggedIn();

document.querySelector('#loginbtn').onclick = function() {
  console.log("VROOM");
  var email = qs("#email").value;
  var password = qs("#password").value;
  jsonRequest('POST', "/api/login", {email: email, password: password}, function(err, res) {
    if(err) alert(err);
    else {
      if(res.ok) {
        document.cookie = "session=" + res.session;
        showManageBox();
      } else {
        alert("Error logging in" + res);
      }
    }
  });
};
