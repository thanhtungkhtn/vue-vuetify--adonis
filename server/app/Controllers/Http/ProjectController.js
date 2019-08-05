'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Project = use('App/Models/Project');
const AuthorizationService = use('App/Services/AuthorizationService');

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({
    request,
    response,
    view,
    auth
  }) {
    const user = await auth.getUser();

    // console.log(user);

    return await user.projects().fetch(); // auth.user.projects().fetch();
  }

  /**
   * Render a form to be used for creating a new project.
   * GET projects/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({
    request,
    response,
    view
  }) {}


  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({
    request,
    response,
    auth
  }) {
    const user = await auth.getUser();
    const {
      title
    } = request.all();
    const project = new Project();
    // project.title = title;
    project.fill({
      title,
    });

    await user.projects().save(project);

    return project;
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({
    params,
    request,
    response,
    view
  }) {}

  /**
   * Render a form to update an existing project.
   * GET projects/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({
    params,
    request,
    response,
    view
  }) {
    const project = await Project.find(params.id);
    // return view.render('edit', {
    //   job: job
    // });
    return project;
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({
    auth,
    params,
    request,
    response
  }) {
    const user = await auth.getUser();
    const {
      id
    } = params;
    const project = await Project.find(id);

    AuthorizationService.verifyPermission(project, user);

    project.merge(request.only('title'));
    await project.save();

    return project;
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({
    auth,
    params,
    request,
    response
  }) {
    const user = await auth.getUser();
    // const id= params.id;
    const {
      id
    } = params;
    const project = await Project.find(id);

    // if (project.user_id !== user.id) {
    //   return response.status(403);
    // }
    AuthorizationService.verifyPermission(project, user);

    await project.delete();

    return project;
  }
}

module.exports = ProjectController
