'use strict'

const User = use('App/Models/User');
const {
  validate
} = use('Validator')


class UserController {
  async create({
    request,
    response,
    auth
  }) {
    console.log("Hello World")

    const {
      username,
      email,
      password
    } = request.only(['username', 'email', 'password'])

    const user = await User.create({
      username,
      email,
      password
    })

    //await auth.login(user); // not jwt

    //return this.login(...arguments);

    // return response.json({
    //   "user": user,
    //   "message": 'user has been created'
    // })
    return response.send({
      message: 'user has been created'
    })
  }

  async login({
    request,
    auth,
    response
  }) {
    //let {email, password} = request.all();
    // const email = request.input("email")
    // const password = request.input("password");
    const {email, password} = request.only(['email', 'password'])

    try {
      if (email && password) {

        console.log(email, password)

        // let user = await User.findBy('email', email)
        // let accessToken = await auth.generate(user)
        // Object.assign(user, accessToken)
        // return response.json(user)

        // const token = await auth.attempt(
        //   request.input('email'),
        //   request.input('password')
        // )
        const token = await auth.attempt(email, password)

        // return response.json({
        //   status: 'success',
        //   message: 'user has successfully logged in',
        //   data: token
        //   //  "user": user,
        //   // "access_token": accessToken
        // })
        //return response.json(token);
         return token;
      }

    } catch (e) {
      return response.status(400).json({
        status: 'error',
        message: 'Invalid email/password'
        //message: 'You first need to register!'
      })
    }
  }

  async show({
    params,
    response
  }) {
    const user = await User.find(params.id)
    const res = {
      username: user.username,
      email: user.email
    }

    //return await user.projects().fetch();

    return response.json(res)
  }
}

module.exports = UserController
