// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel/src/builtins/bundle-url.js"}],"../node_modules/typeface-roboto/index.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./files/roboto-latin-100.woff2":[["roboto-latin-100.1b0f24a1.woff2","../node_modules/typeface-roboto/files/roboto-latin-100.woff2"],"../node_modules/typeface-roboto/files/roboto-latin-100.woff2"],"./files/roboto-latin-100.woff":[["roboto-latin-100.72ef3a57.woff","../node_modules/typeface-roboto/files/roboto-latin-100.woff"],"../node_modules/typeface-roboto/files/roboto-latin-100.woff"],"./files/roboto-latin-100italic.woff2":[["roboto-latin-100italic.c2aa493b.woff2","../node_modules/typeface-roboto/files/roboto-latin-100italic.woff2"],"../node_modules/typeface-roboto/files/roboto-latin-100italic.woff2"],"./files/roboto-latin-100italic.woff":[["roboto-latin-100italic.a32f3bab.woff","../node_modules/typeface-roboto/files/roboto-latin-100italic.woff"],"../node_modules/typeface-roboto/files/roboto-latin-100italic.woff"],"./files/roboto-latin-300.woff2":[["roboto-latin-300.98bd834b.woff2","../node_modules/typeface-roboto/files/roboto-latin-300.woff2"],"../node_modules/typeface-roboto/files/roboto-latin-300.woff2"],"./files/roboto-latin-300.woff":[["roboto-latin-300.b325a0ce.woff","../node_modules/typeface-roboto/files/roboto-latin-300.woff"],"../node_modules/typeface-roboto/files/roboto-latin-300.woff"],"./files/roboto-latin-300italic.woff2":[["roboto-latin-300italic.1133cdc4.woff2","../node_modules/typeface-roboto/files/roboto-latin-300italic.woff2"],"../node_modules/typeface-roboto/files/roboto-latin-300italic.woff2"],"./files/roboto-latin-300italic.woff":[["roboto-latin-300italic.212e4d7c.woff","../node_modules/typeface-roboto/files/roboto-latin-300italic.woff"],"../node_modules/typeface-roboto/files/roboto-latin-300italic.woff"],"./files/roboto-latin-400.woff2":[["roboto-latin-400.fdf5b386.woff2","../node_modules/typeface-roboto/files/roboto-latin-400.woff2"],"../node_modules/typeface-roboto/files/roboto-latin-400.woff2"],"./files/roboto-latin-400.woff":[["roboto-latin-400.b5c7adb0.woff","../node_modules/typeface-roboto/files/roboto-latin-400.woff"],"../node_modules/typeface-roboto/files/roboto-latin-400.woff"],"./files/roboto-latin-400italic.woff2":[["roboto-latin-400italic.21930fa6.woff2","../node_modules/typeface-roboto/files/roboto-latin-400italic.woff2"],"../node_modules/typeface-roboto/files/roboto-latin-400italic.woff2"],"./files/roboto-latin-400italic.woff":[["roboto-latin-400italic.3ac83c2c.woff","../node_modules/typeface-roboto/files/roboto-latin-400italic.woff"],"../node_modules/typeface-roboto/files/roboto-latin-400italic.woff"],"./files/roboto-latin-500.woff2":[["roboto-latin-500.43822231.woff2","../node_modules/typeface-roboto/files/roboto-latin-500.woff2"],"../node_modules/typeface-roboto/files/roboto-latin-500.woff2"],"./files/roboto-latin-500.woff":[["roboto-latin-500.cea1e1a6.woff","../node_modules/typeface-roboto/files/roboto-latin-500.woff"],"../node_modules/typeface-roboto/files/roboto-latin-500.woff"],"./files/roboto-latin-500italic.woff2":[["roboto-latin-500italic.2633889a.woff2","../node_modules/typeface-roboto/files/roboto-latin-500italic.woff2"],"../node_modules/typeface-roboto/files/roboto-latin-500italic.woff2"],"./files/roboto-latin-500italic.woff":[["roboto-latin-500italic.df940655.woff","../node_modules/typeface-roboto/files/roboto-latin-500italic.woff"],"../node_modules/typeface-roboto/files/roboto-latin-500italic.woff"],"./files/roboto-latin-700.woff2":[["roboto-latin-700.6f4f7054.woff2","../node_modules/typeface-roboto/files/roboto-latin-700.woff2"],"../node_modules/typeface-roboto/files/roboto-latin-700.woff2"],"./files/roboto-latin-700.woff":[["roboto-latin-700.851d1064.woff","../node_modules/typeface-roboto/files/roboto-latin-700.woff"],"../node_modules/typeface-roboto/files/roboto-latin-700.woff"],"./files/roboto-latin-700italic.woff2":[["roboto-latin-700italic.98d04b04.woff2","../node_modules/typeface-roboto/files/roboto-latin-700italic.woff2"],"../node_modules/typeface-roboto/files/roboto-latin-700italic.woff2"],"./files/roboto-latin-700italic.woff":[["roboto-latin-700italic.b0813ff5.woff","../node_modules/typeface-roboto/files/roboto-latin-700italic.woff"],"../node_modules/typeface-roboto/files/roboto-latin-700italic.woff"],"./files/roboto-latin-900.woff2":[["roboto-latin-900.25e35df1.woff2","../node_modules/typeface-roboto/files/roboto-latin-900.woff2"],"../node_modules/typeface-roboto/files/roboto-latin-900.woff2"],"./files/roboto-latin-900.woff":[["roboto-latin-900.be617765.woff","../node_modules/typeface-roboto/files/roboto-latin-900.woff"],"../node_modules/typeface-roboto/files/roboto-latin-900.woff"],"./files/roboto-latin-900italic.woff2":[["roboto-latin-900italic.1c1ce47b.woff2","../node_modules/typeface-roboto/files/roboto-latin-900italic.woff2"],"../node_modules/typeface-roboto/files/roboto-latin-900italic.woff2"],"./files/roboto-latin-900italic.woff":[["roboto-latin-900italic.44ad9f4e.woff","../node_modules/typeface-roboto/files/roboto-latin-900italic.woff"],"../node_modules/typeface-roboto/files/roboto-latin-900italic.woff"],"_css_loader":"../node_modules/parcel/src/builtins/css-loader.js"}],"../node_modules/typeface-montserrat/index.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"./files/montserrat-latin-100.woff2":[["montserrat-latin-100.735483f2.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-100.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-100.woff2"],"./files/montserrat-latin-100.woff":[["montserrat-latin-100.6b98a665.woff","../node_modules/typeface-montserrat/files/montserrat-latin-100.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-100.woff"],"./files/montserrat-latin-100italic.woff2":[["montserrat-latin-100italic.abe700a6.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-100italic.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-100italic.woff2"],"./files/montserrat-latin-100italic.woff":[["montserrat-latin-100italic.eaaee3c7.woff","../node_modules/typeface-montserrat/files/montserrat-latin-100italic.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-100italic.woff"],"./files/montserrat-latin-200.woff2":[["montserrat-latin-200.05e8e80c.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-200.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-200.woff2"],"./files/montserrat-latin-200.woff":[["montserrat-latin-200.52777ccb.woff","../node_modules/typeface-montserrat/files/montserrat-latin-200.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-200.woff"],"./files/montserrat-latin-200italic.woff2":[["montserrat-latin-200italic.45b058e6.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-200italic.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-200italic.woff2"],"./files/montserrat-latin-200italic.woff":[["montserrat-latin-200italic.ce44ca37.woff","../node_modules/typeface-montserrat/files/montserrat-latin-200italic.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-200italic.woff"],"./files/montserrat-latin-300.woff2":[["montserrat-latin-300.af816cf9.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-300.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-300.woff2"],"./files/montserrat-latin-300.woff":[["montserrat-latin-300.d3be8895.woff","../node_modules/typeface-montserrat/files/montserrat-latin-300.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-300.woff"],"./files/montserrat-latin-300italic.woff2":[["montserrat-latin-300italic.96c1cb0e.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-300italic.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-300italic.woff2"],"./files/montserrat-latin-300italic.woff":[["montserrat-latin-300italic.651062b8.woff","../node_modules/typeface-montserrat/files/montserrat-latin-300italic.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-300italic.woff"],"./files/montserrat-latin-400.woff2":[["montserrat-latin-400.5a1d4964.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-400.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-400.woff2"],"./files/montserrat-latin-400.woff":[["montserrat-latin-400.a4efabf8.woff","../node_modules/typeface-montserrat/files/montserrat-latin-400.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-400.woff"],"./files/montserrat-latin-400italic.woff2":[["montserrat-latin-400italic.333fdfa7.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-400italic.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-400italic.woff2"],"./files/montserrat-latin-400italic.woff":[["montserrat-latin-400italic.21bf2625.woff","../node_modules/typeface-montserrat/files/montserrat-latin-400italic.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-400italic.woff"],"./files/montserrat-latin-500.woff2":[["montserrat-latin-500.e23e87cf.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-500.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-500.woff2"],"./files/montserrat-latin-500.woff":[["montserrat-latin-500.65e9f748.woff","../node_modules/typeface-montserrat/files/montserrat-latin-500.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-500.woff"],"./files/montserrat-latin-500italic.woff2":[["montserrat-latin-500italic.0a326a9e.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-500italic.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-500italic.woff2"],"./files/montserrat-latin-500italic.woff":[["montserrat-latin-500italic.0c3a8ad6.woff","../node_modules/typeface-montserrat/files/montserrat-latin-500italic.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-500italic.woff"],"./files/montserrat-latin-600.woff2":[["montserrat-latin-600.77172c6a.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-600.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-600.woff2"],"./files/montserrat-latin-600.woff":[["montserrat-latin-600.5007bb89.woff","../node_modules/typeface-montserrat/files/montserrat-latin-600.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-600.woff"],"./files/montserrat-latin-600italic.woff2":[["montserrat-latin-600italic.8ad26bff.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-600italic.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-600italic.woff2"],"./files/montserrat-latin-600italic.woff":[["montserrat-latin-600italic.2ea3e9f5.woff","../node_modules/typeface-montserrat/files/montserrat-latin-600italic.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-600italic.woff"],"./files/montserrat-latin-700.woff2":[["montserrat-latin-700.8f9b0ff8.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-700.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-700.woff2"],"./files/montserrat-latin-700.woff":[["montserrat-latin-700.0da9a5ba.woff","../node_modules/typeface-montserrat/files/montserrat-latin-700.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-700.woff"],"./files/montserrat-latin-700italic.woff2":[["montserrat-latin-700italic.9045c822.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-700italic.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-700italic.woff2"],"./files/montserrat-latin-700italic.woff":[["montserrat-latin-700italic.a5d4f3ed.woff","../node_modules/typeface-montserrat/files/montserrat-latin-700italic.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-700italic.woff"],"./files/montserrat-latin-800.woff2":[["montserrat-latin-800.baeeb3b4.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-800.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-800.woff2"],"./files/montserrat-latin-800.woff":[["montserrat-latin-800.c272651e.woff","../node_modules/typeface-montserrat/files/montserrat-latin-800.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-800.woff"],"./files/montserrat-latin-800italic.woff2":[["montserrat-latin-800italic.9cc327d5.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-800italic.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-800italic.woff2"],"./files/montserrat-latin-800italic.woff":[["montserrat-latin-800italic.80391d28.woff","../node_modules/typeface-montserrat/files/montserrat-latin-800italic.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-800italic.woff"],"./files/montserrat-latin-900.woff2":[["montserrat-latin-900.5d27865b.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-900.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-900.woff2"],"./files/montserrat-latin-900.woff":[["montserrat-latin-900.aad0af67.woff","../node_modules/typeface-montserrat/files/montserrat-latin-900.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-900.woff"],"./files/montserrat-latin-900italic.woff2":[["montserrat-latin-900italic.d613e7ff.woff2","../node_modules/typeface-montserrat/files/montserrat-latin-900italic.woff2"],"../node_modules/typeface-montserrat/files/montserrat-latin-900italic.woff2"],"./files/montserrat-latin-900italic.woff":[["montserrat-latin-900italic.2e5816d2.woff","../node_modules/typeface-montserrat/files/montserrat-latin-900italic.woff"],"../node_modules/typeface-montserrat/files/montserrat-latin-900italic.woff"],"_css_loader":"../node_modules/parcel/src/builtins/css-loader.js"}],"load-fonts.js":[function(require,module,exports) {
"use strict";

require("typeface-roboto");

require("typeface-montserrat");
},{"typeface-roboto":"../node_modules/typeface-roboto/index.css","typeface-montserrat":"../node_modules/typeface-montserrat/index.css"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "34443" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","load-fonts.js"], null)
//# sourceMappingURL=/load-fonts.39f32682.js.map