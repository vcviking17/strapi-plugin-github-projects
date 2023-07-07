'use strict';

module.exports = function (_ref) {
  var strapi = _ref.strapi;
  return {
    index: function index(ctx) {
      return regeneratorRuntime.async(function index$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(strapi.plugin('github-projects').service('getReposService').getPublicRepos());

            case 2:
              ctx.body = _context.sent;

            case 3:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  };
};