'use strict'

class Login {
  get rules() {
    return {
      // validation rules
      'email': 'required|email',
      'password': 'required'
    }
  }
  get messages() {
    return {
      'required': 'Woah now, {{ field }} is required.',
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

module.exports = Login
