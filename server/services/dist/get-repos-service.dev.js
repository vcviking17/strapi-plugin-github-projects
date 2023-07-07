'use strict';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('@octokit/request'),
    request = _require.request;

var axios = require('axios');

var md = require('markdown-it')();

module.exports = function (_ref) {
  var strapi = _ref.strapi;
  return {
    getProjectForRepo: function getProjectForRepo(repo) {
      var id, matchingProjects;
      return regeneratorRuntime.async(function getProjectForRepo$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = repo.id;
              console.log("Searching for project with repositoryId ".concat(id));
              _context.next = 4;
              return regeneratorRuntime.awrap(strapi.entityService.findMany("plugin::github-projects.project", {
                filters: {
                  repositoryId: id
                }
              }));

            case 4:
              matchingProjects = _context.sent;

              if (!(matchingProjects.length == 1)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", matchingProjects[0].id);

            case 7:
              return _context.abrupt("return", null);

            case 8:
            case "end":
              return _context.stop();
          }
        }
      });
    },
    getPublicRepos: function getPublicRepos() {
      var result;
      return regeneratorRuntime.async(function getPublicRepos$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(request('GET /user/repos', {
                headers: {
                  authorization: "token ".concat(process.env.GITHUB_TOKEN)
                },
                type: 'public' //we only want public repos

              }));

            case 2:
              result = _context3.sent;
              return _context3.abrupt("return", Promise.all(result.data.map(function _callee(item) {
                var id, name, description, html_url, owner, default_branch, readmeUrl, longDescription, repo, relatedProjectId;
                return regeneratorRuntime.async(function _callee$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        id = item.id, name = item.name, description = item.description, html_url = item.html_url, owner = item.owner, default_branch = item.default_branch;
                        readmeUrl = "https://raw.githubusercontent.com/".concat(owner.login, "/").concat(name, "/").concat(default_branch, "/README.md"); //const longDescription = (await axios.get(readmeUrl)).data;

                        _context2.t0 = md;
                        _context2.next = 5;
                        return regeneratorRuntime.awrap(axios.get(readmeUrl));

                      case 5:
                        _context2.t1 = _context2.sent.data;
                        longDescription = _context2.t0.render.call(_context2.t0, _context2.t1).replaceAll("\n", "<br />");
                        repo = {
                          id: id,
                          name: name,
                          shortDescription: description,
                          url: html_url,
                          longDescription: longDescription
                        }; //add logic to search for an existing project for the current repo

                        _context2.next = 10;
                        return regeneratorRuntime.awrap(strapi.plugin("github-projects").service("getReposService").getProjectForRepo(repo));

                      case 10:
                        relatedProjectId = _context2.sent;
                        return _context2.abrupt("return", _objectSpread({}, repo, {
                          projectId: relatedProjectId
                        }));

                      case 12:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              })));

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      });
    }
  };
};