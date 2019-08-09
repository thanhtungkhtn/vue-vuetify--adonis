'use strict'

const User = use('App/Models/User')

class AuthController {

  /**
   * Handles user signup
   *
   * @method signup
   *
   * @param  {Object} request
   * @param  {Object} auth
   * @param  {Object} response
   *
   * @return {JSON}
   */
  async signup ({ request, auth, response }) {
    // get user data from signup form
    const userData = request.only(['name', 'username', 'email', 'password'])

    console.log("Hello World")

    try {
        // save user to database
        const user = await User.create(userData)
        console.log(user)

        // generate JWT token for user
        const token = await auth.generate(user)

        //await auth.login(user); // not jwt

        //return this.login(...arguments);

        // return response.json({
        //   "user": user,
        //   "message": 'user has been created'
        // })
        // return response.send({
        //   message: 'user has been created'
        // })
        return response.json({
            status: 'success',
            data: token
        })
    } catch (error) {
        return response.status(400).json({
            status: 'error',
            message: 'There was a problem creating the user, please try again later.'
        })
    }
  }

    /**
   * Handles user authentication
   *
   * @method login
   *
   * @param  {Object} request
   * @param  {Object} auth
   * @param  {Object} response
   *
   * @return {String|JSON}
   */
  async login ({ request, auth, response }) {

    // let {email, password} = request.all();
    // const email = request.input("email")
    // const password = request.input("password");
    // const {email, password} = request.only(['email', 'password'])

    try {
        // validate the user credentials and generate a JWT token
        const token = await auth.attempt(
            request.input('email'),
            request.input('password')
        )

        // let user = await User.findBy('email', email)
        // let accessToken = await auth.generate(user)
        // Object.assign(user, accessToken)
        // return response.json(user)

        // return response.json({
        //   status: 'success',
        //   message: 'user has successfully logged in',
        //   data: token
        //   //  "user": user,
        //   // "access_token": accessToken
        // })
        // return response.json(token);
        return token;

        // return response.json({
        //     status: 'success',
        //     data: token
        // })
    } catch (error) {
        response.status(400).json({
            status: 'error',
            message: 'Invalid email/password'
        })
    }
  }

  async show({
    params,
    response
  }) {
    const user = await User.find(params.id)
    const res = {
      name: user.username,
      username: user.username,
      email: user.email
    }

    //return await user.projects().fetch();

    return response.json(res)
  }
}

module.exports = AuthController
