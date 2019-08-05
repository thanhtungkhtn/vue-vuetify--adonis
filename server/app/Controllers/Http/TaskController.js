'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Project = use('App/Models/Project');
const Task = use('App/Models/Task');
const AuthorizationService = use('App/Services/AuthorizationService');

const { validate } = use('Validator')


/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view, auth, params }) {
     const user = await auth.getUser();
     const { id } = params;
     const project = await Project.find(id);

     AuthorizationService.verifyPermission(project, user);

     return await project.tasks().fetch();
     //return project.Task;
  }

  /**
   * Render a form to be used for creating a new task.
   * GET tasks/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth, params }) {

    const user = await auth.getUser();

    const { description } = request.all();
    const { id } = params;

    const project = await Project.find(id);

    AuthorizationService.verifyPermission(project, user);
    const task = new Task();
    task.fill({ description, });
    await project.tasks().save(task);

    return task; //notification: 'Task added!'
  }

  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing task.
   * GET tasks/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, auth, response }) {
    const user = await auth.getUser();
    const { id } = params;
    const task = await Task.find(id);
    const project = await task.project().fetch();
    console.log(project);
    console.log(task);
    console.log(user);

    AuthorizationService.verifyPermission(project, user);
    task.merge(request.only([
      'description',
      'completed',
    ]));
    await task.save();
    return task;
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const user = await auth.getUser();
    const { id } = params;

    const task = await Task.find(id);
    const project = await task.project().fetch();

    AuthorizationService.verifyPermission(project, user);
    await task.delete();

    return task; //notification: 'Task deleted!'
  }
}

module.exports = TaskController
