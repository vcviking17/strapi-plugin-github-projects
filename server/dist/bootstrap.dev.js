"use strict";

var RBAC_ACTIONS = [{
  section: "plugins",
  displayName: "View and access the plugin",
  uid: "use",
  pluginName: "github-projects"
}, {
  section: "plugins",
  subCategory: "Repositories",
  displayName: "Read Github repositories",
  uid: "repos.read",
  pluginName: "github-projects"
}, {
  section: "plugins",
  subCategory: "Projects",
  displayName: "Read Project entities",
  uid: "projects.read",
  pluginName: "github-projects"
}, {
  section: "plugins",
  subCategory: "Projects",
  displayName: "Create Project entities",
  uid: "projects.create",
  pluginName: "github-projects"
}, {
  section: "plugins",
  subCategory: "Projects",
  displayName: "Delete Project entities",
  uid: "projects.delete",
  pluginName: "github-projects"
}];

module.exports = function _callee(_ref) {
  var strapi;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          strapi = _ref.strapi;
          _context.next = 3;
          return regeneratorRuntime.awrap(strapi.admin.services.permission.actionProvider.registerMany(RBAC_ACTIONS));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};