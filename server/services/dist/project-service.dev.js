"use strict";

module.exports = function (_ref) {
  var strapi = _ref.strapi;
  return {
    create: function create(repo, userId) {
      var newProject;
      return regeneratorRuntime.async(function create$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(strapi.entityService.create("plugin::github-projects.project", {
                data: {
                  repositoryId: "".concat(repo.id),
                  title: repo.name,
                  shortDescription: repo.shortDescription,
                  repositoryUrl: repo.url,
                  longDescription: repo.longDescription,
                  createdBy: userId,
                  updatedBy: userId
                }
              }));

            case 2:
              newProject = _context.sent;
              return _context.abrupt("return", newProject);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    "delete": function _delete(projectId) {
      var deletedProject;
      return regeneratorRuntime.async(function _delete$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(strapi.entityService["delete"]("plugin::github-projects.project", projectId));

            case 2:
              deletedProject = _context2.sent;
              return _context2.abrupt("return", deletedProject);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    },
    createAll: function createAll(repos, userId) {
      var createPRomises;
      return regeneratorRuntime.async(function createAll$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              createPRomises = repos.map(function _callee(repo) {
                return regeneratorRuntime.async(function _callee$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return regeneratorRuntime.awrap(strapi.plugin("github-projects").service("projectService").create(repo, userId));

                      case 2:
                        return _context3.abrupt("return", _context3.sent);

                      case 3:
                      case "end":
                        return _context3.stop();
                    }
                  }
                });
              });
              return _context4.abrupt("return", Promise.all(createPRomises));

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    deleteAll: function deleteAll(projectIds) {
      var deletePromises;
      return regeneratorRuntime.async(function deleteAll$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              deletePromises = projectIds.map(function _callee2(id) {
                return regeneratorRuntime.async(function _callee2$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return regeneratorRuntime.awrap(strapi.plugin("github-projects").service("projectService")["delete"](id));

                      case 2:
                        return _context5.abrupt("return", _context5.sent);

                      case 3:
                      case "end":
                        return _context5.stop();
                    }
                  }
                });
              });
              return _context6.abrupt("return", Promise.all(deletePromises));

            case 2:
            case "end":
              return _context6.stop();
          }
        }
      });
    },
    find: function find(params) {
      var projects;
      return regeneratorRuntime.async(function find$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return regeneratorRuntime.awrap(strapi.entityService.findMany("plugin::github-projects.project", params));

            case 2:
              projects = _context7.sent;
              return _context7.abrupt("return", projects);

            case 4:
            case "end":
              return _context7.stop();
          }
        }
      });
    },
    findOne: function findOne(projectId, params) {
      var project;
      return regeneratorRuntime.async(function findOne$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return regeneratorRuntime.awrap(strapi.entityService.findOne("plugin::github-projects.project", projectId, params));

            case 2:
              project = _context8.sent;
              return _context8.abrupt("return", project);

            case 4:
            case "end":
              return _context8.stop();
          }
        }
      });
    }
  };
};