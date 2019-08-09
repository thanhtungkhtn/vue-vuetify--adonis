'use strict'

const Favorite = use('App/Models/Favorite')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with favorites
 */
class FavoriteController {

  /**
   * Favorite a specified tweet
   *
   * @method favorite
   *
   * @param  {Object} request
   * @param  {Object} auth
   * @param  {Object} response
   *
   * @return {JSON}
   */
  async favorite ({ request, auth, response }) {
    // get currently authenticated user
    const user = auth.current.user

    const tweetId = request.input('tweet_id')

    const favorite = await Favorite.findOrCreate(
        { user_id: user.id, tweet_id: tweetId },
        { user_id: user.id, tweet_id: tweetId }
    )

    return response.json({
        status: 'success',
        data: favorite
    })
  }

  /**
   * Unfavorite a specified tweet
   *
   * @method unFavorite
   *
   * @param  {Object} params
   * @param  {Object} auth
   * @param  {Object} response
   *
   * @return {NULL}
   */
  async unFavorite ({ params, auth, response }) {
    // get currently authenticated user
    const user = auth.current.user

    // fetch favorite
    await Favorite.query()
        .where('user_id', user.id)
        .where('tweet_id', params.id)
        .delete()

    return response.json({
        status: 'success',
        data: null
    })
  }

  /**
   * Show a list of all favorites.
   * GET favorites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new favorite.
   * GET favorites/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new favorite.
   * POST favorites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single favorite.
   * GET favorites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing favorite.
   * GET favorites/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update favorite details.
   * PUT or PATCH favorites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a favorite with id.
   * DELETE favorites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = FavoriteController
