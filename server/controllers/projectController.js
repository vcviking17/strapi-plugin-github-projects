"use strict"

module.exports = ({ strapi }) => ({
  create: async (ctx) => {
    //create the new project
    const repo = ctx.request.body;
    const newProject = await strapi
      .plugin("github-projects")
      .service("projectService")
      .create(repo, ctx.state.user.id);
    return newProject;
  },
  delete: async (ctx) => {
    const projectId = ctx.params.id;
    const deletedProject = await strapi
      .plugin("github-projects")
      .service("projectService")
      .delete(projectId);
    return deletedProject;
  },
  createAll: async (ctx) => {
    //create the new projects
    const { repos } = ctx.request.body;
    const createdProjects = await strapi
      .plugin("github-projects")
      .service("projectService")
      .createAll(repos, ctx.state.user.id);
    return createdProjects;
  },
  deleteAll: async (ctx) => {
    //since the delete does not accept a body paylod, we had to put it in params
    const { projectIds} = ctx.query;
    const deletedProjects = await strapi
      .plugin("github-projects")
      .service("projectService")
      .deleteAll(projectIds);
    return deletedProjects;
  },
  find: async (ctx) => {
    console.log("find", ctx.query)
    const projects = await strapi
      .plugin("github-projects")
      .service("projectService")
      .find(ctx.query);
    return projects;
  },
  findOne: async (ctx) => {
    const projectId = ctx.params.id;
    const project = await strapi
      .plugin("github-projects")
      .service("projectService")
      .findOne(projectId, ctx.query);
    return project;
  }
});