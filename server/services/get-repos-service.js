'use strict';

const { request } = require('@octokit/request');
const axios = require('axios');
const md = require('markdown-it')();

module.exports = ({ strapi }) => ({
  getProjectForRepo: async (repo) => {
    const {id} = repo;
    console.log(`Searching for project with repositoryId ${id}`);
    const matchingProjects = await strapi.entityService.findMany(
      "plugin::github-projects.project",
      {
        filters: {
          repositoryId: id,
        },
      }
    );
    if (matchingProjects.length == 1) {
      return matchingProjects[0].id;
    }
    return null;
  },
  getPublicRepos: async () => {
    const result = await request('GET /user/repos', {
      headers: {
        authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      type: 'public', //we only want public repos
    });
    //id, name, shortDescription, url, longDescription
    //longDescription is the content of the readme file in the repo
    return Promise.all(result.data.map(async (item) => {
      const { id, name, description, html_url, owner, default_branch } = item;
      const readmeUrl = `https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`
      //const longDescription = (await axios.get(readmeUrl)).data;
      const longDescription = md.render((await axios.get(readmeUrl)).data).replaceAll("\n", "<br />");      
      const repo = {
        id,
        name,
        shortDescription: description,
        url: html_url,
        longDescription,
      };
      //add logic to search for an existing project for the current repo
      const relatedProjectId = await strapi.plugin("github-projects").service("getReposService").getProjectForRepo(repo);
      return {
        ...repo,
        projectId: relatedProjectId
      }
    }));
  },
});
