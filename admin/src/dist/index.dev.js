"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _helperPlugin = require("@strapi/helper-plugin");

var _package = _interopRequireDefault(require("../../package.json"));

var _pluginId = _interopRequireDefault(require("./pluginId"));

var _Initializer = _interopRequireDefault(require("./components/Initializer"));

var _PluginIcon = _interopRequireDefault(require("./components/PluginIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var name = _package["default"].strapi.name;
var _default = {
  register: function register(app) {
    app.addMenuLink({
      to: "/plugins/".concat(_pluginId["default"]),
      icon: _PluginIcon["default"],
      intlLabel: {
        id: "".concat(_pluginId["default"], ".plugin.name"),
        defaultMessage: name
      },
      Component: function Component() {
        var component;
        return regeneratorRuntime.async(function Component$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return regeneratorRuntime.awrap(Promise.resolve().then(function () {
                  return _interopRequireWildcard(require('./pages/App'));
                }));

              case 2:
                component = _context.sent;
                return _context.abrupt("return", component);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        });
      },
      permissions: [// Uncomment to set the permissions of the plugin here
      {
        action: 'plugin::github-projects.use',
        // the action name should be plugin::plugin-name.actionType
        subject: null
      }]
    });
    app.registerPlugin({
      id: _pluginId["default"],
      initializer: _Initializer["default"],
      isReady: false,
      name: name
    });
  },
  bootstrap: function bootstrap(app) {},
  registerTrads: function registerTrads(_ref) {
    var locales, importedTrads;
    return regeneratorRuntime.async(function registerTrads$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            locales = _ref.locales;
            _context2.next = 3;
            return regeneratorRuntime.awrap(Promise.all(locales.map(function (locale) {
              return Promise.resolve().then(function () {
                return _interopRequireWildcard(require("./translations/".concat(locale, ".json")));
              }).then(function (_ref2) {
                var data = _ref2["default"];
                return {
                  data: (0, _helperPlugin.prefixPluginTranslations)(data, _pluginId["default"]),
                  locale: locale
                };
              })["catch"](function () {
                return {
                  data: {},
                  locale: locale
                };
              });
            })));

          case 3:
            importedTrads = _context2.sent;
            return _context2.abrupt("return", Promise.resolve(importedTrads));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  }
};
exports["default"] = _default;