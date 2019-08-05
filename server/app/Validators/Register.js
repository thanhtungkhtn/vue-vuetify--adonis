'use strict'

class Register {
  get rules() {
    return {
      // validation rules
      'username': 'required|unique:users',
      'email': 'required|email|unique:users,email',
      'password': 'required'
    }
  }

  get messages() {
    return {
      'required': 'Woah now, {{ field }} is required.',
      'unique': 'Wait a second, {{ field }} already exists'
    }
  }

  // async fails(error) {
  //   this.ctx.session.withErrors(error)
  //     .flashAll();

  //   return this.ctx.response.redirect('back');
  // }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages)
    //response.status(400).send(validate.errors)
  }
}

module.exports = Register
