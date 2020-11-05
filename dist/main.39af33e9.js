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
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $addButton = $siteList.find('li#addButton');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: '#icon-bilibili',
  url: 'https://bilibili.com'
}, {
  logo: '#icon-google',
  url: 'https://google.com'
}]; //用于简化用户输入的网址，防止过长出现布局混乱

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, ''); //正则表达式，删除‘/’开头的内容
};

var render = function render() {
  $siteList.find('li:not(#addButton)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("<li>\n        <div class=\"site\">\n            <div class=\"logo\">\n                <svg class=\"icon\">\n                    <use xlink:href=\"".concat(node.logo, "\"></use>\n                </svg>\n            </div>\n            <div class=\"link\">").concat(simplifyUrl(node.url), "</div>\n            <div class=\"deleteSite\">\n                <svg class=\"icon\" >\n                    <use xlink:href=\"#icon-delete\"></use>\n                </svg>\n            </div>\n        </div>\n    </li>")).insertBefore($addButton);
    $li.on('click', function () {
      window.open(node.url);
    });
    $li.on('click', '.deleteSite', function (e) {
      console.log('删除了哟');
      e.stopPropagation(); //阻止冒泡

      hashMap.splice(index, 1);
      render();
    });
  });
}; //生成起始默认页面


render();
$addButton.on('click', function () {
  var url = window.prompt('要输入添加的网址哈~');
  var siteIcon = simplifyUrl(url).replace(/\..*/, ''); //正则去除‘.’之后的内容,siteIcon用于表示收藏网址的域名，方便匹配logo

  var siteIconList = ['baidu', 'bilibili', 'google', 'acfun', 'taobao', 'github', 'qq', 'yuque'];

  if (siteIconList.indexOf(siteIcon) !== -1) {
    siteIcon = '#icon-' + simplifyUrl(url).replace(/\..*/, '');
  } else {
    siteIcon = '#icon-web';
  }

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  console.log(url);
  console.log(siteIcon);
  hashMap.push({
    logo: siteIcon,
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
}; // 监听键盘事件


$(document).on('keypress', function (e) {
  var key = e.key; //这个写法等价于 key=e.key

  for (var i = 0; i < hashMap.length; i++) {
    if (simplifyUrl(hashMap[i].url).substr(0, 1) === key) {
      window.open(hashMap[i].url);
    }
  }
});
$('input').on('keypress', function (e) {
  e.stopPropagation();
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.39af33e9.js.map