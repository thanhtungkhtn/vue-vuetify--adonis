'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Contact = use('App/Models/Contact');
const AuthorizationService = use('App/Services/AuthorizationService');

/**
 * Resourceful controller for interacting with contacts
 */
class ContactController {
  /**
   * Show a list of all contacts.
   * GET contacts
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

    //let contacts = await Contact.query().with('user').fetch()

    return await user.contacts().fetch();
    //return response.json(contacts)
    //return contacts
  }

  /**
   * Render a form to be used for creating a new contact.
   * GET contacts/create
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
   * Create/save a new contact.
   * POST contacts
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

    const name = request.input('name')
    const email = request.input('email')
    const title = request.input('title')
    const tel = request.input('tel')

    const contact = new Contact()
    contact.name = name
    contact.email = email
    contact.title = title
    contact.tel = tel

    await user.contacts().save(contact);

    return response.json(contact)
  }

  /**
   * Display a single contact.
   * GET contacts/:id
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
   * Render a form to update an existing contact.
   * GET contacts/:id/edit
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
  }) {}

  /**
   * Update contact details.
   * PUT or PATCH contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({
    params,
    request,
    response,
    auth
  }) {
    const user = await auth.getUser();

    let contact = await Contact.find(params.id);

    // luc update bi valide ??

    // const name = request.input('name')
    // const email = request.input('email')
    // const title = request.input('title')
    // const tel = request.input('tel')

    AuthorizationService.verifyPermission(contact, user);

    // contact.name = name
    // contact.email = email
    // contact.title = title
    // contact.tel = tel

    contact.merge(request.only([
      'name',
      'email',
      'title',
      'tel'
    ]));
    await contact.save()

    return contact
  }

  /**
   * Delete a contact with id.
   * DELETE contacts/:id
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
    const contact = await Contact.find(id);

    // if (project.user_id !== user.id) {
    //   return response.status(403);
    // }
    AuthorizationService.verifyPermission(contact, user);

    await contact.delete();

    return contact;
  }
  // async destroy({
  //   params,
  //   request,
  //   response,
  //   auth
  // }) {
  //   const user = await auth.getUser();
  //   AuthorizationService.verifyPermission(contact, user);

  //   await Contact.find(params.id).delete()
  //   return response.json({
  //     message: 'Contact deleted!'
  //   })
  // }
}

module.exports = ContactController
