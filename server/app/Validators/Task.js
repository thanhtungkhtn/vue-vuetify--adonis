'use strict'

class Task {
  get rules() {
    return {
      // validation rules
      'description': 'required|min:3|max:255',
      //'completed': 'required'
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

  // show error messages upon validation fail
  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages)
    //response.status(400).send(validate.errors)
  }
      //   // Fash success message to session
    //   session.flash({
    //   notification: 'Task added!'
    // })
}

module.exports = Task
