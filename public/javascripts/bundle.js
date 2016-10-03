(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}



var Bounds = function Bounds(x, y, width, height) {
  _classCallCheck(this, Bounds);

  this.x = x;
  this.x1 = x;
  this.y = y;
  this.y1 = y;
  this.width = width;
  this.height = height;
  this.x2 = x + width;
  this.y2 = y + height;
};

exports.default = Bounds;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;_e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }return _arr;
  }return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _bounds = require("./bounds.js");

var _bounds2 = _interopRequireDefault(_bounds);

var _node = require("./node.js");

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var TEXT_FONT_SIZE = 14;
// const TEXT_FONT_FAMILY = "monospace";
var TEXT_FONT_FAMILY = "sans-serif";
var NODE_MARGIN_WIDTH = 25;
var NODE_MARGIN_HEIGHT = 15;
var NODE_LINE_MARGIN = 5;
var CENTER_NODE_MARGIN = 5;
var NODE_HEIGHT = TEXT_FONT_SIZE + NODE_LINE_MARGIN + 1;
var NODE_HEIGHT_WITH_MARGIN = NODE_HEIGHT + NODE_MARGIN_HEIGHT;

var MindMap = function () {
  function MindMap(targetElementId) {
    _classCallCheck(this, MindMap);

    $.jCanvas.defaults.fromCenter = false;
    $.jCanvas.defaults.layer = true;
    this.canvasDom_ = document.querySelector(targetElementId);
    this.canvas_ = $(this.canvasDom_);
    this._initializeCanvas();
  }

  // Public functions

  _createClass(MindMap, [{
    key: "draw",
    value: function draw(root) {
      this.clear();

      this._setNodeId(root);

      var leftChildren = null,
          rightChildren = null;

      var _divideBalancedNodes2 = this._divideBalancedNodes(root);

      var _divideBalancedNodes3 = _slicedToArray(_divideBalancedNodes2, 2);

      leftChildren = _divideBalancedNodes3[0];
      rightChildren = _divideBalancedNodes3[1];

      var leftMaxTextLengthNodes = this._getMaxTextLengthNodes(leftChildren);
      var rightMaxTextLengthNodes = this._getMaxTextLengthNodes(rightChildren);

      var leftLeafCount = this._getAllLeafCount(leftChildren);
      var rightLeafCount = this._getAllLeafCount(rightChildren);

      var canvasSize = this._getCanvasSize(root, leftLeafCount, rightLeafCount, leftMaxTextLengthNodes, rightMaxTextLengthNodes);

      var centerNodeBounds = this._drawCenterNode(canvasSize.leftNodesWidth, Math.max(canvasSize.height / 2 - TEXT_FONT_SIZE - CENTER_NODE_MARGIN, 0), root.id, root.text);

      this._drawLeftNodeChildrenFromCenterNode(leftChildren, centerNodeBounds);
      this._drawRightNodeChildrenFromCenterNode(rightChildren, centerNodeBounds);

      this._adjustCanvasSize(canvasSize);
    }
  }, {
    key: "clear",
    value: function clear() {
      // this.canvas_.clearCanvas();
      this.canvas_.removeLayers();
      this.canvas_.drawLayers();
    }

    // Private functions

  }, {
    key: "_setNodeId",
    value: function _setNodeId(node) {
      var id = 0;
      _node2.default.visit(node, function (x) {
        x.id = id;
        id += 1;
      });
    }
  }, {
    key: "_adjustCanvasSize",
    value: function _adjustCanvasSize(canvasSize) {
      this.canvas_.attr("width", canvasSize.width);
      this.canvas_.attr("height", canvasSize.height);
      this.canvas_.drawLayers();
    }
  }, {
    key: "_sum",
    value: function _sum(x) {
      if (x.length > 0) {
        return x.reduce(function (p, c) {
          return p + c;
        });
      } else {
        return 0;
      }
    }
  }, {
    key: "_measureText",
    value: function _measureText(text) {
      return this.canvasDom_.getContext("2d").measureText(text).width;
    }
  }, {
    key: "_drawText",
    value: function _drawText(x, y, name, text) {
      this.canvas_.drawText({
        fillStyle: "black",
        // strokeStyle: "black",
        strokeWidth: "0",
        x: x,
        y: y,
        fontSize: TEXT_FONT_SIZE,
        fontFamily: TEXT_FONT_FAMILY,
        text: text,
        name: name + "-text"
      });
      return this.canvas_.getLayer(name + "-text");
    }
  }, {
    key: "_drawLink",
    value: function _drawLink(x, y, name, text, url) {
      this.canvas_.drawText({
        fillStyle: "blue",
        // strokeStyle: "black",
        strokeWidth: "0",
        x: x,
        y: y,
        fontSize: TEXT_FONT_SIZE,
        fontFamily: TEXT_FONT_FAMILY,
        text: text,
        name: name + "-text",
        click: function (url) {
          return function () {
            location.href = url;
          };
        }(url),
        cursors: {
          mouseover: "pointer"
        }
      });
      return this.canvas_.getLayer(name + "-text");
    }
  }, {
    key: "_initializeCanvas",
    value: function _initializeCanvas() {
      var dummyTextLayer = this._drawText(0, 0, "dummy", "");
      this.canvas_.removeLayer(dummyTextLayer).drawLayers();
    }
  }, {
    key: "_drawRect",
    value: function _drawRect(x, y, width, height, name) {
      this.canvas_.drawRect({
        strokeStyle: "gray",
        strokeWidth: 1,
        x: x,
        y: y,
        width: width,
        height: height,
        cornerRadius: 5,
        name: name + "-rect"
      });
      return this.canvas_.getLayer(name + "-rect");
    }
  }, {
    key: "_drawLine",
    value: function _drawLine(x1, y1, x2, y2, name) {
      this.canvas_.drawLine({
        strokeStyle: "gray",
        strokeWidth: 1,
        x1: x1, y1: y1,
        x2: x2, y2: y2,
        name: name + "-line"
      });
      return this.canvas_.getLayer(name + "-line");
    }
  }, {
    key: "_drawCenterNode",
    value: function _drawCenterNode(x, y, name, text) {
      var textLayer = this._drawText(x + CENTER_NODE_MARGIN, y + CENTER_NODE_MARGIN, name, text);
      var width = textLayer.width + CENTER_NODE_MARGIN * 2;
      var height = textLayer.height + CENTER_NODE_MARGIN * 2;
      this._drawRect(x, y, width, height, name);
      return new _bounds2.default(x, y, width, height);
    }
  }, {
    key: "_drawNode",
    value: function _drawNode(x, y, isLeftBase, node) {
      var textWidth = this._measureText(node.text);
      if (isLeftBase) {
        // this._drawText(x, y, node.id, node.text);
        this._drawTokens(x, y, node);
        this._drawLine(x, y + TEXT_FONT_SIZE + NODE_LINE_MARGIN, x + textWidth, y + TEXT_FONT_SIZE + NODE_LINE_MARGIN, node.id);
        return new _bounds2.default(x, y, textWidth, TEXT_FONT_SIZE + NODE_LINE_MARGIN);
      } else {
        // this._drawText(x - textWidth, y, node.id, node.text);
        this._drawTokens(x - textWidth, y, node);
        this._drawLine(x - textWidth, y + TEXT_FONT_SIZE + NODE_LINE_MARGIN, x, y + TEXT_FONT_SIZE + NODE_LINE_MARGIN, node.id);
        return new _bounds2.default(x - textWidth, y, textWidth, TEXT_FONT_SIZE + NODE_LINE_MARGIN);
      }
    }
  }, {
    key: "_drawTokens",
    value: function _drawTokens(x, y, node) {
      var _this = this;

      var cx = x;
      node.tokens.forEach(function (token, index) {
        var layer = void 0;
        if (token.hasUrl()) {
          layer = _this._drawLink(cx, y, node.id + "-" + index, token.text, token.url);
        } else {
          layer = _this._drawText(cx, y, node.id + "-" + index, token.text);
        }
        cx = cx + layer.width;
      });
    }
  }, {
    key: "_connectNodeToCenterNode",
    value: function _connectNodeToCenterNode(nodeBounds, centerNodeBounds, name) {
      var isLeft = nodeBounds.x2 < centerNodeBounds.x1;
      var x1 = isLeft ? nodeBounds.x2 : nodeBounds.x1;
      var y1 = nodeBounds.y1 + nodeBounds.height;
      var cx1 = isLeft ? centerNodeBounds.x1 : centerNodeBounds.x1 + centerNodeBounds.width;
      var cy1 = nodeBounds.y1 + nodeBounds.height;
      var cx2 = isLeft ? nodeBounds.x2 : nodeBounds.x1;
      var cy2 = centerNodeBounds.y1 + centerNodeBounds.height / 2;
      var x2 = isLeft ? centerNodeBounds.x1 : centerNodeBounds.x2;
      var y2 = centerNodeBounds.y1 + centerNodeBounds.height / 2;
      this.canvas_.drawBezier({
        strokeStyle: "gray",
        strokeWidth: 1,
        x1: x1, y1: y1,
        cx1: cx1, cy1: cy1,
        cx2: cx2, cy2: cy2,
        x2: x2, y2: y2,
        name: name + "-bezier"
      });
    }
  }, {
    key: "_connectNodes",
    value: function _connectNodes(parentBounds, childBounds, name) {
      var isLeft = childBounds.x2 < parentBounds.x1;
      var x1 = isLeft ? childBounds.x2 : childBounds.x1;
      var y1 = childBounds.y1 + childBounds.height;
      var cx1 = isLeft ? parentBounds.x1 : parentBounds.x1 + parentBounds.width;
      var cy1 = childBounds.y1 + childBounds.height;
      var cx2 = isLeft ? childBounds.x2 : childBounds.x1;
      var cy2 = parentBounds.y2;
      var x2 = isLeft ? parentBounds.x1 : parentBounds.x2;
      var y2 = parentBounds.y2;
      this.canvas_.drawBezier({
        strokeStyle: "gray",
        strokeWidth: 1,
        x1: x1, y1: y1,
        cx1: cx1, cy1: cy1,
        cx2: cx2, cy2: cy2,
        x2: x2, y2: y2,
        name: name + "-bezier"
      });
    }
  }, {
    key: "_getLeafCount",
    value: function _getLeafCount(node) {
      var leafCount = 0;
      _node2.default.visit(node, function (x) {
        if (x.isLeaf()) {
          leafCount += 1;
        }
      });
      return leafCount;
    }
  }, {
    key: "_getDivideIndex",
    value: function _getDivideIndex(root) {
      var _this2 = this;

      var leafCountList = root.children.map(function (child) {
        return _this2._getLeafCount(child);
      });
      var minDelta = null;
      var divideIndex = null;
      leafCountList.forEach(function (leafCount, index) {
        if (index < leafCountList.length - 1) {
          var sum = function sum(prev, current) {
            return prev + current;
          };
          var leftSum = leafCountList.slice(0, index + 1).reduce(sum);
          var rightSum = leafCountList.slice(index + 1).reduce(sum);
          var delta = Math.abs(leftSum - rightSum);
          if (minDelta) {
            if (delta < minDelta) {
              minDelta = delta;
              divideIndex = index;
            }
          } else {
            minDelta = delta;
            divideIndex = index;
          }
        }
      });
      return divideIndex;
    }
  }, {
    key: "_divideBalancedNodes",
    value: function _divideBalancedNodes(root) {
      // var divideIndex = this._getDivideIndex(root);
      var divideIndex = 0
      var left = root.children.slice(0, divideIndex);
      var right = root.children.slice(divideIndex);
      return [left, right];
    }
  }, {
    key: "_getAllTextLength",
    value: function _getAllTextLength(nodes) {
      var _this3 = this;

      if (nodes.length > 0) {
        return this._sum(nodes.map(function (x) {
          return _this3._measureText(x.text);
        }));
      } else {
        return 0;
      }
    }
  }, {
    key: "_getMaxTextLengthNodes",
    value: function _getMaxTextLengthNodes(children) {
      var _this4 = this;

      var maxLengthNodes = [];
      var traverse = function traverse(children, prev) {
        children.forEach(function (node) {
          var nodes = prev.slice();
          nodes.push(node);
          if (node.isLeaf()) {
            if (_this4._getAllTextLength(maxLengthNodes) < _this4._getAllTextLength(nodes)) {
              maxLengthNodes = nodes;
            }
          } else {
            traverse(node.children, nodes);
          }
        });
      };
      traverse(children, []);
      return maxLengthNodes;
    }
  }, {
    key: "_getAllLeafCount",
    value: function _getAllLeafCount(nodes) {
      var _this5 = this;

      return this._sum(nodes.map(function (node) {
        return _this5._getLeafCount(node);
      }));
    }
  }, {
    key: "_getCanvasSize",
    value: function _getCanvasSize(root, leftLeafCount, rightLeafCount, leftMaxTextLengthNodes, rightMaxTextLengthNodes) {
      var _this6 = this;

      var getWidth = function getWidth(nodes) {
        return _this6._sum(nodes.map(function (node) {
          return _this6._measureText(node.text) + NODE_MARGIN_WIDTH;
        }));
      };
      var leftNodesWidth = getWidth(leftMaxTextLengthNodes);
      var rightNodesWidth = getWidth(rightMaxTextLengthNodes);
      var centerNodeWidth = this._measureText(root.text) + CENTER_NODE_MARGIN * 2 + 1;
      var width = leftNodesWidth + rightNodesWidth + centerNodeWidth;
      var height = Math.max(NODE_HEIGHT_WITH_MARGIN * Math.max(leftLeafCount, rightLeafCount), TEXT_FONT_SIZE + CENTER_NODE_MARGIN * 2);
      return {
        width: width,
        height: height,
        leftNodesWidth: leftNodesWidth,
        rightNodesWidth: rightNodesWidth,
        centerNodeWidth: centerNodeWidth
      };
    }
  }, {
    key: "_drawLeftNodeChildrenFromNode",
    value: function _drawLeftNodeChildrenFromNode(children, parentNodeBounds, baseHeight) {
      var _this7 = this;

      var currentHeight = baseHeight;
      children.forEach(function (node) {
        var allNodesHeight = _this7._getLeafCount(node) * NODE_HEIGHT_WITH_MARGIN;
        var y = currentHeight + allNodesHeight / 2 - NODE_HEIGHT / 2;
        var x = parentNodeBounds.x - NODE_MARGIN_WIDTH;
        var nodeBounds = _this7._drawNode(x, y, false, node);
        _this7._connectNodes(parentNodeBounds, nodeBounds, node.id);
        _this7._drawLeftNodeChildrenFromNode(node.children, nodeBounds, currentHeight);
        currentHeight += allNodesHeight;
      });
    }
  }, {
    key: "_drawLeftNodeChildrenFromCenterNode",
    value: function _drawLeftNodeChildrenFromCenterNode(children, centerNodeBounds) {
      var _this8 = this;

      var currentHeight = 0;
      children.forEach(function (node) {
        var allNodesHeight = _this8._getLeafCount(node) * NODE_HEIGHT_WITH_MARGIN;
        var y = currentHeight + allNodesHeight / 2 - NODE_HEIGHT / 2;
        var x = centerNodeBounds.x - NODE_MARGIN_WIDTH;
        var nodeBounds = _this8._drawNode(x, y, false, node);
        _this8._connectNodeToCenterNode(nodeBounds, centerNodeBounds, node.id);
        _this8._drawLeftNodeChildrenFromNode(node.children, nodeBounds, currentHeight);
        currentHeight += allNodesHeight;
      });
    }
  }, {
    key: "_drawRightNodeChildrenFromNode",
    value: function _drawRightNodeChildrenFromNode(children, parentNodeBounds, baseHeight) {
      var _this9 = this;

      var currentHeight = baseHeight;
      children.forEach(function (node) {
        var allNodesHeight = _this9._getLeafCount(node) * NODE_HEIGHT_WITH_MARGIN;
        var y = currentHeight + allNodesHeight / 2 - NODE_HEIGHT / 2;
        var x = parentNodeBounds.x2 + NODE_MARGIN_WIDTH;
        var nodeBounds = _this9._drawNode(x, y, true, node);
        _this9._connectNodes(parentNodeBounds, nodeBounds, node.id);
        _this9._drawRightNodeChildrenFromNode(node.children, nodeBounds, currentHeight);
        currentHeight += allNodesHeight;
      });
    }
  }, {
    key: "_drawRightNodeChildrenFromCenterNode",
    value: function _drawRightNodeChildrenFromCenterNode(children, centerNodeBounds) {
      var _this10 = this;

      var currentHeight = 0;
      children.forEach(function (node) {
        var allNodesHeight = _this10._getLeafCount(node) * NODE_HEIGHT_WITH_MARGIN;
        var y = currentHeight + allNodesHeight / 2 - NODE_HEIGHT / 2;
        var x = centerNodeBounds.x2 + NODE_MARGIN_WIDTH;
        var nodeBounds = _this10._drawNode(x, y, true, node);
        _this10._connectNodeToCenterNode(nodeBounds, centerNodeBounds, node.id);
        _this10._drawRightNodeChildrenFromNode(node.children, nodeBounds, currentHeight);
        currentHeight += allNodesHeight;
      });
    }
  }]);

  return MindMap;
}();

exports.default = MindMap;

},{"./bounds.js":1,"./node.js":4}],3:[function(require,module,exports){
"use strict";

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _mindmap = require("./mindmap.js");

var _mindmap2 = _interopRequireDefault(_mindmap);

var _parser = require("./parser.js");

var _parser2 = _interopRequireDefault(_parser);

var _work = require("./work.js");

var _work2 = _interopRequireDefault(_work);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Newtab = function () {
  function Newtab() {
    _classCallCheck(this, Newtab);
    console.log('NewTab');
    this.mm = new _mindmap2.default("#target");
    this.currentWork = _work2.default.newInstance();

    this.assignEventHandlers();
    this.loadWorkList();
  }

  _createClass(Newtab, [{
    key: "assignEventHandlers",
    value: function assignEventHandlers() {
      var _this = this;

      var source = document.querySelector("#source");
      source.addEventListener("keydown", function (e) {
        var elem, end, start, value;
        if (e.keyCode === 9) {
          if (e.preventDefault) {
            e.preventDefault();
          }
          elem = e.target;
          start = elem.selectionStart;
          end = elem.selectionEnd;
          value = elem.value;
          elem.value = "" + value.substring(0, start) + "\t" + value.substring(end);
          elem.selectionStart = elem.selectionEnd = start + 1;
          return false;
        }
      });

      source.addEventListener("keyup", function () {
        _this.drawMindmap(function () {
          _this.currentWork.save(function () {
            _this.loadWorkList();
          });
        });
      });

      var btnLast = document.querySelector("#btnLast");
      btnLast.addEventListener("click", function () {
        _work2.default.getLast(function (work) {
          _this.load(work);
        });
      });

      var btnDelete = document.querySelector("#btnDelete");
      btnDelete.addEventListener("click", function () {
        if (_this.currentWork.content) {
          var confirmMessage = document.querySelector("#confirmMessage");
          confirmMessage.innerText = "Do you really want to delete `" + _this.currentWork.firstLine + "`?";
          $("#confirmDialog").modal("show");
        }
      });

      var btnConfirmYes = document.querySelector("#btnConfirmYes");
      btnConfirmYes.addEventListener("click", function () {
        $("#confirmDialog").modal("hide");
        if (_this.currentWork.content) {
          _work2.default.remove(_this.currentWork, function () {
            _this.loadWorkList();
            _this.load(_work2.default.newInstance());
          });
        }
      });

      var btnNew = document.querySelector("#btnNew");
      btnNew.addEventListener("click", function () {
        _this.load(_work2.default.newInstance());
      });

      var btnTopSites = document.querySelector("#btnTopSites");
      btnTopSites.addEventListener("click", function () {
        var text = "Top Sites\n";
        chrome.topSites.get(function (sites) {
          sites.forEach(function (site) {
            text = text + "\t[" + site.title + "](" + site.url + ")\n";
          });
          var work = new _work2.default(Date.now(), text, Date.now());
          work.isSave = false;
          _this.load(work);
        });
      });

      var btnCopyAsPlainText = document.querySelector("#btnCopyAsPlainText");
      btnCopyAsPlainText.addEventListener("click", function () {
        _this.onBtnCopyAsPlainTextClicked();
      });

      var btnCopyAsMarkdownText = document.querySelector("#btnCopyAsMarkdownText");
      btnCopyAsMarkdownText.addEventListener("click", function () {
        _this.onBtnCopyAsMarkdownTextClicked();
      });
    }
  }, {
    key: "onBtnCopyAsPlainTextClicked",
    value: function onBtnCopyAsPlainTextClicked() {
      var source = document.querySelector("#source");
      if (source.value) {
        this.copyTextToClipboardViaCopyBuffer(source.value);
      }
    }
  }, {
    key: "onBtnCopyAsMarkdownTextClicked",
    value: function onBtnCopyAsMarkdownTextClicked() {
      var _this2 = this;

      var source = document.querySelector("#source").value;
      var root = new _parser2.default().parse(source);
      if (root) {
        (function () {
          var text = "";
          var traverse = function traverse(node, currentLevel) {
            for (var i = 0; i < currentLevel; i += 1) {
              text += "  ";
            }
            text += "* " + node.source + "\n";
            if (!node.isLeaf()) {
              node.children.forEach(function (child) {
                traverse(child, currentLevel + 1);
              });
            }
          };
          traverse(root, 0);
          _this2.copyTextToClipboardViaCopyBuffer(text);
        })();
      }
    }
  }, {
    key: "copyTextToClipboardViaCopyBuffer",
    value: function copyTextToClipboardViaCopyBuffer(text) {
      var copyBuffer = document.querySelector("#copyBuffer");
      copyBuffer.value = text;
      var range = document.createRange();
      range.selectNode(copyBuffer);
      window.getSelection().addRange(range);
      try {
        var result = document.execCommand("copy");
        var msg = result ? "successful" : "unsuccessful";
        console.log("Copy source text was " + msg);
      } catch (e) {
        console.log("Oops, unable to copy");
      }
    }
  }, {
    key: "drawMindmap",
    value: function drawMindmap(callback) {
      var source = document.querySelector("#source").value;
      var root = new _parser2.default().parse(source);
      if (root) {
        this.currentWork.content = source;
        this.mm.draw(root);
      } else {
        this.mm.clear();
      }
      if (callback) {
        callback();
      }
    }
  }, {
    key: "load",
    value: function load(work) {
      this.currentWork = work;
      var source = document.querySelector("#source");
      source.value = this.currentWork.content;
      this.drawMindmap();
    }
  }, {
    key: "toLocaleString",
    value: function toLocaleString(date) {
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join("/") + " " + date.toLocaleTimeString();
    }
  }, {
    key: "loadWorkList",
    value: function loadWorkList() {
      var _this3 = this;
      console.log('loadWorkList');
      _work2.default.getAll(function (works) {
        var history = document.querySelector("#history");
        history.innerHTML = "";
        works.forEach(function (work) {
          var li = document.createElement("li");
          var link = document.createElement("a");
          link.href = "#";
          var label = work.firstLine + " (" + _this3.toLocaleString(new Date(work.created)) + ")";
          link.appendChild(document.createTextNode(label));
          link.addEventListener("click", function (x) {
            return function () {
              _this3.load(x);
            };
          }(work));
          li.appendChild(link);
          history.appendChild(li);
        });
      });
    }
  }]);

  return Newtab;
}();

window.addEventListener("load", function () {
  new Newtab();
});

},{"./mindmap.js":2,"./parser.js":5,"./work.js":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _token = require("./token.js");

var _token2 = _interopRequireDefault(_token);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Node = function () {
  function Node(source) {
    _classCallCheck(this, Node);

    this.tokens = [];
    this.children = [];
    this.parent = null;
    this.id = null;
    this.source = source ? source.trim() : "";
    this._parseText(this.source);
  }

  _createClass(Node, [{
    key: "_parseText",
    value: function _parseText(source) {
      var re = /\[(.+?)]\((.+?)\)/g;
      var pos = 0;
      var rs = re.exec(source);
      while (rs) {
        if (pos < rs.index) {
          this.tokens.push(new _token2.default(source.substring(pos, rs.index)));
        }
        var text = rs[1];
        var url = rs[2];
        this.tokens.push(new _token2.default(text, url));
        pos = rs.index + rs[0].length;
        rs = re.exec(source);
      }
      if (pos < source.length) {
        this.tokens.push(new _token2.default(source.substring(pos)));
      }
    }
  }, {
    key: "add",
    value: function add(text, callback) {
      var child = new Node(text);
      child.setParent(this);
      this.children.push(child);
      if (callback) {
        callback(child);
      }
      return this;
    }
  }, {
    key: "setParent",
    value: function setParent(parent) {
      this.parent = parent;
    }
  }, {
    key: "isRoot",
    value: function isRoot() {
      return this.parent == null;
    }
  }, {
    key: "isLeaf",
    value: function isLeaf() {
      return this.children.length === 0;
    }
  }, {
    key: "text",
    get: function get() {
      return this.tokens.map(function (token) {
        return token.text;
      }).join("");
    }
  }], [{
    key: "root",
    value: function root(text) {
      return new Node(text);
    }
  }, {
    key: "visit",
    value: function visit(node, callback) {
      callback(node);
      node.children.forEach(function (child) {
        Node.visit(child, callback);
      });
    }
  }]);

  return Node;
}();

exports.default = Node;

},{"./token.js":6}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _node3 = require("./node.js");

var _node4 = _interopRequireDefault(_node3);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Parser = function () {
  function Parser() {
    _classCallCheck(this, Parser);
  }

  _createClass(Parser, [{
    key: "parse",

    // Public functions

    value: function parse(source) {
      var lines = source.split(/\r\n|\r|\n/);
      var root = null;
      var prevNode = null;
      var prevLevel = -1;
      for (var i = 0; i < lines.length; i += 1) {
        if (lines[i].trim()) {
          var level = this._getIndentLevel(lines[i]);
          if (i === 0) {
            if (level === 0) {
              root = _node4.default.root(lines[i]);
              prevNode = root;
              prevLevel = 0;
            } else {
              console.log("Invalid first line.");
              return null;
            }
          } else {
            if (prevLevel === level) {
              var parentNode = prevNode.parent;
              if (parentNode) {
                var node = null;
                parentNode.add(lines[i], function (x) {
                  node = x;
                });
                prevLevel = level;
                prevNode = node;
              } else {
                console.log("Parent is null.");
                return null;
              }
            } else if (level < prevLevel) {
              var _parentNode = prevNode.parent;
              for (var j = 0; j < prevLevel - level; j += 1) {
                _parentNode = _parentNode.parent;
              }
              if (_parentNode) {
                var _node = null;
                _parentNode.add(lines[i], function (x) {
                  _node = x;
                });
                prevLevel = level;
                prevNode = _node;
              } else {
                console.log("Parent is null.");
                return null;
              }
            } else if (prevLevel === level - 1) {
              var _node2 = null;
              prevNode.add(lines[i], function (x) {
                _node2 = x;
              });
              prevLevel = level;
              prevNode = _node2;
            } else {
              console.log("Invalid indent.");
              return null;
            }
          }
        }
      }
      return root;
    }

    // Private functions

  }, {
    key: "_getIndentLevel",
    value: function _getIndentLevel(text) {
      var level = 0;
      for (var i = 0; i < text.length; i += 1) {
        if (text.charAt(i) === "\t") {
          level += 1;
        } else {
          break;
        }
      }
      return level;
    }
  }]);

  return Parser;
}();

exports.default = Parser;

},{"./node.js":4}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Token = function () {
  function Token(text, url) {
    _classCallCheck(this, Token);

    this.text = text;
    this.url = url;
  }

  _createClass(Token, [{
    key: "hasUrl",
    value: function hasUrl() {
      return this.url && this.url.length > 0;
    }
  }]);

  return Token;
}();

exports.default = Token;

},{}],7:[function(require,module,exports){
// var MindDAO = require("./../../models/mongodb.js")
      $.ajax({
        type: "POST",
        url: '/mindmap/insert',
        data: {}})
// MindDAO.insert();
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Work = function () {
  function Work(created, content, updated) {
    _classCallCheck(this, Work);

    this.created = created;
    this.content = content;
    this.updated = updated;
    this.isSave = true;
  }

  _createClass(Work, [{
    key: "save",
    value: function save(callback) {
      var _this = this;

      if (this.isSave && this.content.trim().length > 0) {
        Work._getAll(function (contentMap) {
          // TODO: Should check exists and updated
          _this.updated = Date.now();
          contentMap[_this.created] = {
            created: _this.created,
            content: _this.content,
            updated: _this.updated
          };
          console.log('save');
          // console.log({contentMap: contentMap})
/*          chrome.storage.local.set({
            contentMap: contentMap
          }, function () {
            if (callback) {
              callback();
            }
          });*/
           $.ajax({
              type: "POST",
              url: '/mindmap/save',
              data: contentMap})
          // MindDAO.save(contentMap)

        });
      } else {
        if (callback) {
          callback();
        }
      }
    }
  }, {
    key: "firstLine",
    get: function get() {
      var lines = this.content.split(/\r\n|\r|\n/);
      if (lines && lines.length > 0) {
        return lines[0];
      } else {
        return "";
      }
    }
  }], [{
    key: "newInstance",
    value: function newInstance() {
      var now = Date.now();
      return new Work(now, "", now);
    }
  }, {
    key: "_getAll",
    value: function _getAll(callback) {
      // chrome.storage.local.get("contentMap", function (item) {
      //   callback(item.contentMap || {});
      // });
      console.log('_getAll');
          $.ajax({
       type: "GET",
       url: '/mindmap/get',
       success: function(json){
          callback(json)
       }})
      // MindDAO.get(callback)
    }
  }, {
    key: "getAll",
    value: function getAll(callback) {
      console.log('getAll');
        Work.getAllKeys(function (keys,contentMap) {
          // console.log(keys);
          callback(keys.map(function (key) {
            var data = contentMap[key];
            return new Work(data.created, data.content, data.updated);
          }));
        });
    }
  }, {
    key: "getLast",
    value: function getLast(callback) {
      Work._getAll(function (contentMap) {
        var keys = Object.keys(contentMap);
        if (keys && keys.length > 0) {
          var max = keys.reduce(function (p, c) {
            return Math.max(p, c);
          });
          var data = contentMap[max];
          callback(new Work(data.created, data.content, data.updated));
        } else {
          callback(null);
        }
      });
    }
  }, {
    key: "getAllKeys",
    value: function getAllKeys(callback) {
      Work._getAll(function (contentMap) {
        var keys = Object.keys(contentMap);
        callback(keys.sort(function (a, b) {
          return b - a;
        }),contentMap);
      });
    }
  }, {
    key: "removeAll",
    value: function removeAll(callback) {
      // chrome.storage.local.set({
      //   contentMap: {}
      // }, function () {
      //   callback();
      // });
      console.log('removeAll');
           $.ajax({
              type: "POST",
              url: '/mindmap/save',
              data: {}})
      // MindDAO.save({})
    }
  }, {
    key: "remove",
    value: function remove(work, callback) {
      Work._getAll(function (contentMap) {
        delete contentMap[work.created];
        // chrome.storage.local.set({
        //   contentMap: contentMap
        // }, function () {
        //   callback();
        // });
        console.log('remove');
           $.ajax({
              type: "POST",
              url: '/mindmap/save',
              data: contentMap})
        // MindDAO.save(contentMap)
      });
    }
  }]);

  return Work;
}();

exports.default = Work;

},{}]},{},[3]);
