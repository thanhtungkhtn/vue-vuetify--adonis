'use strict'

class Contact {
  get rules() {
    return {
      // validation rules
      'name': 'required|min:3|max:60',
      'email': 'required|email|min:3|max:254',
      'title': 'required|min:3|max:254',
      'tel': 'required'
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

module.exports = Contact
