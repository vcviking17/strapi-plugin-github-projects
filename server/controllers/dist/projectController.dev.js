"use strict";

module.exports = function (_ref) {
  var strapi = _ref.strapi;
  return {
    create: function create(ctx) {
      var repo, newProject;
      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              //create the new project
              repo = ctx.request.body;
              _context.next = 3;
              return regeneratorRuntime.awrap(strapi.plugin("github-projects").service("projectService").create(repo, ctx.state.user.id));

            case 3:
              newProject = _context.sent;
              return _context.abrupt("return", newProject);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    "delete": function _delete(ctx) {
      var projectId, deletedProject;
      return regeneratorRuntime.async(function _delete$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              projectId = ctx.params.id;
              _context2.next = 3;
              return regeneratorRuntime.awrap(strapi.plugin("github-projects").service("projectService")["delete"](projectId));

            case 3:
              deletedProject = _context2.sent;
              return _context2.abrupt("return", deletedProject);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    createAll: function createAll(ctx) {
      var repos, createdProjects;
      return regeneratorRuntime.async(function createAll$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              //create the new projects
              repos = ctx.request.body.repos;
              _context3.next = 3;
              return regeneratorRuntime.awrap(strapi.plugin("github-projects").service("projectService").createAll(repos, ctx.state.user.id));

            case 3:
              createdProjects = _context3.sent;
              return _context3.abrupt("return", createdProjects);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    deleteAll: function deleteAll(ctx) {
      var projectIds, deletedProjects;
      return regeneratorRuntime.async(function deleteAll$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              //since the delete does not accept a body paylod, we had to put it in params
              projectIds = ctx.query.projectIds;
              _context4.next = 3;
              return regeneratorRuntime.awrap(strapi.plugin("github-projects").service("projectService").deleteAll(projectIds));

            case 3:
              deletedProjects = _context4.sent;
              return _context4.abrupt("return", deletedProjects);

            case 5:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    find: function find(ctx) {
      var projects;
      return regeneratorRuntime.async(function find$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              console.log("find", ctx.query);
              _context5.next = 3;
              return regeneratorRuntime.awrap(strapi.plugin("github-projects").service("projectService").find(ctx.query));

            case 3:
              projects = _context5.sent;
              return _context5.abrupt("return", projects);

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    findOne: function findOne(ctx) {
      var projectId, project;
      return regeneratorRuntime.async(function findOne$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              projectId = ctx.params.id;
              _context6.next = 3;
              return regeneratorRuntime.awrap(strapi.plugin("github-projects").service("projectService").findOne(projectId, ctx.query));

            case 3:
              project = _context6.sent;
              return _context6.abrupt("return", project);

            case 5:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  };
};