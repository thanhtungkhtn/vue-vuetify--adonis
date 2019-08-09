'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     *
     * Look at `app/Models/Hooks/UserHook.js` file to
     * check the hashPassword method
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
    //this.addHook('beforeCreate', 'User.hashPassword')
  }

  /**
   * Hide password when user is fetched.
   */
  static get hidden () {
    return ['password']
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens() {
    return this.hasMany('App/Models/Token')
  }
  projects() {
    return this.hasMany('App/Models/Project')
  }
  contacts() {
    return this.hasMany('App/Models/Contact')
  }

  tweets () {
    return this.hasMany('App/Models/Tweet')
  }

  /**
   * A user can have many followers.
   *
   * @method followers
   *
   * @return {Object}
   */
  followers () {
    return this.belongsToMany(
      'App/Models/User',
      'user_id',
      'follower_id'
    ).pivotTable('followers')
  }

  /**
   * A user can follow many other users.
   *
   * @method following
   *
   * @return {Object}
   */
  following () {
    return this.belongsToMany(
      'App/Models/User',
      'follower_id',
      'user_id'
    ).pivotTable('followers')
  }

  /**
   * A user can post many replies to a tweet.
   *
   * @method replies
   *
   * @return {Object}
   */
  replies () {
    return this.hasMany('App/Models/Reply')
  }

  /**
   * A user can have many favorite tweets.
   *
   * @method favorites
   *
   * @return {Object}
   */
  favorites () {
    return this.hasMany('App/Models/Favorite')
  }
}

module.exports = User
