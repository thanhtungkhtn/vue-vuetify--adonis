'use strict'

const Tweet = use('App/Models/Tweet')
const Reply = use('App/Models/Reply')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tweets
 */
class TweetController {

  /**
   * Post a tweet
   *
   * @method tweet
   *
   * @param  {Object} request
   * @param  {Object} auth
   * @param  {Object} response
   *
   * @return {JSON}
   */
  async tweet ({ request, auth, response }) {
    // get currently authenticated user
    const user = auth.current.user

    // Save tweet to database
    const tweet = await Tweet.create({
        user_id: user.id,
        tweet: request.input('tweet')
    })

    // fetch tweet's relations
    await tweet.loadMany(['user', 'favorites', 'replies'])

    return response.json({
        status: 'success',
        message: 'Tweet posted!',
        data: tweet
    })
  }

  /**
   * Reply a tweet
   *
   * @method reply
   *
   * @param  {Object} request
   * @param  {Object} auth
   * @param  {Object} params
   * @param  {Object} response
   *
   * @return {JSON}
   */
  async reply ({ request, auth, params, response }) {
    // get currently authenticated user
    const user = auth.current.user

    // get tweet with the specified ID
    const tweet = await Tweet.find(params.id)

    // persist to database
    const reply = await Reply.create({
        user_id: user.id,
        tweet_id: tweet.id,
        reply: request.input('reply')
    })

    // fetch user that made the reply
    await reply.load('user')

    return response.json({
        status: 'success',
        message: 'Reply posted!',
        data: reply
    })
  }

  /**
   * Show a list of all tweets.
   * GET tweets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new tweet.
   * GET tweets/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new tweet.
   * POST tweets
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
  }

  /**
   * Display a single tweet.
   * GET tweets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   *
   * @return {JSON}
   */
  async show ({ params, request, response, view }) {
    try {
      const tweet = await Tweet.query()
          .where('id', params.id)
          .with('user')
          .with('replies')
          .with('replies.user')
          .with('favorites')
          .firstOrFail()

      return response.json({
          status: 'success',
          data: tweet
      })
    } catch (error) {
        return response.status(404).json({
            status: 'error',
            message: 'Tweet not found'
        })
    }
  }

  /**
   * Render a form to update an existing tweet.
   * GET tweets/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update tweet details.
   * PUT or PATCH tweets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a tweet with id.
   * DELETE tweets/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Object} auth
   * @param {Object} params
   *
   * @return {NULL}
   */
  async destroy ({ auth, params, request, response }) {
    // get currently authenticated user
    const user = auth.current.user

    // get tweet with the specified ID
    const tweet = await Tweet.query()
        .where('user_id', user.id)
        .where('id', params.id)
        .firstOrFail()

    await tweet.delete()

    return response.json({
        status: 'success',
        message: 'Tweet deleted!',
        data: null
    })
  }
}

module.exports = TweetController
