(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// ASSET PATHS SETUP
// Global config to allow each project to define the correct relative path to assets
// defined in our javascript modules.

if (typeof ASSETS_PATH === "undefined") {
  ASSETS_PATH = "/";
}

},{}],2:[function(require,module,exports){

var spritePath = ASSETS_PATH + "img/scpr-sprite.svg";
var ajax = new XMLHttpRequest();
ajax.open("GET", spritePath, true);
ajax.send();
ajax.onload = function (e) {
  var div = document.createElement("div");
  div.style.display = "none";
  div.innerHTML = ajax.responseText;
  document.body.insertBefore(div, document.body.childNodes[0]);
};

},{}],3:[function(require,module,exports){

// REQUIRE MODULES

require('./configAssetPaths.js');
require('./icons.js');
require('./media.js');
require('./wells.js');

},{"./configAssetPaths.js":1,"./icons.js":2,"./media.js":4,"./wells.js":5}],4:[function(require,module,exports){

// Collect large headlines that might need resizing.
var headlines = document.getElementsByClassName("media__headline--h1");

function checkLengthAndResize(headline, index) {

  // Look inside the headline's hyperlink to get the text
  // character count.
  var charCount = headline.getElementsByTagName("a")[0].textContent.length;

  // If this is a headline likely to wrap to three lines,
  // let's add a class to typeset it smaller.
  if (charCount > 60) {
    headline.classList.add("media__headline--h1-verbose");
  }
}

// Iterate through large headlines and resize where appropriate.
Array.from(headlines).forEach(checkLengthAndResize);

},{}],5:[function(require,module,exports){

// Wells JS
var s,
    wells = {

  settings: {
    well: document.getElementsByClassName("js-well"),
    wellDismissBtn: document.getElementsByClassName("js-well--dismiss-btn")
  },

  init: function () {
    s = this.settings;
    this.bindUIActions();
    this.onLoadActions();
  },

  forEach: function (array, callback, scope) {
    for (var i = 0; i < array.length; i++) {
      callback.call(scope, i, array[i]); // passes back stuff we need
    }
  },

  bindUIActions: function () {
    wells.forEach(s.wellDismissBtn, function (index, element) {
      element.addEventListener("click", function (event) {
        wells.dismissWell(element);
        event.preventDefault();
      }, false);
    });
  },

  onLoadActions: function () {
    wells.forEach(s.well, function (index, element) {
      // check cookies and hide wells where viewsLeft === 0
      var cookieName = element.getAttribute("data-name");
      var cookieValue = element.getAttribute("data-views");

      wells.createOrUpdateCookie(cookieName, cookieValue, element);
    });
  },

  getCookie: function (name) {
    var keyValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  },

  setCookie: function (name, viewsLeft) {
    var expires = new Date();

    expires.setTime(expires.getTime() + 31536000000); // 1 year
    document.cookie = name + "=" + viewsLeft + "; expires=" + expires.toUTCString();
  },

  createOrUpdateCookie: function (name, viewsLeft, element) {
    var cookie = wells.getCookie(name);
    var cookieValue = parseInt(cookie, 10);

    if (cookie === null) {
      wells.setCookie(name, viewsLeft);
    } else if (cookieValue > 0) {
      // Read cookie and update if it needs to be decremented
      viewsLeft = cookieValue - 1;
      wells.setCookie(name, viewsLeft);
    } else if (cookieValue === 0) {
      wells.dismissWell(element);
    }
  },

  dismissWell: function (element) {
    if (element.classList.contains("js-well")) {
      var wellElement = element;
    } else {
      wellElement = element.parentNode;
    }
    var name = wellElement.getAttribute("data-name");

    wellElement.classList.add("js--hidden");
    wells.setCookie(name, 0);
  }

};

(function () {
  if (document.getElementsByClassName("js-well").length) {
    wells.init();
  }
})();

},{}]},{},[3]);
