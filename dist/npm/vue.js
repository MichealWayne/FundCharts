"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var fundcharts = _interopRequireWildcard(require("./index"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function capitalize(_ref) {
  var _ref2 = _toArray(_ref),
      first = _ref2[0],
      rest = _ref2.slice(1);

  return first.toUpperCase() + rest.join('');
}

function generateId(prefix) {
  return "".concat(prefix).concat(('' + Math.random()).slice(-8));
}

function wrap(fcComp) {
  var id = generateId('fundcharts-');
  return {
    template: "<div :style=\"{height}\" ref=\"".concat(id, "\" :id=\"id\"></div>"),
    data: function data() {
      return {
        charter: null,
        id: id
      };
    },
    props: {
      prefix: {
        type: String
      },
      height: {
        type: String,
        default: '200px'
      },
      options: {
        type: Object,
        default: {}
      }
    },
    watch: {
      options: function options(newval) {
        if (newval && this.charter) this.charter.update(newval);
      }
    },
    beforeMount: function beforeMount() {
      if (this.prefix) this.id = this.prefix;
    },
    mounted: function mounted() {
      if (this.$refs[id]) {
        if (!this.charter) {
          var _id = this.id;

          var _charter = new fcComp(_objectSpread({
            id: _id
          }, this.options));

          _charter.init();

          this.charter = _charter;
        }
      }
    }
  };
}

var FundCharts = {};

for (var key in fundcharts) {
  FundCharts[capitalize(key)] = wrap(fundcharts[key]);
}

module.exports = FundCharts;