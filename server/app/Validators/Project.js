'use strict'

class Project {
  get rules() {
    return {
      // validation rules
      'title': 'required|min:3|max:254|unique:projects', //projects,title
    }
  }
  get messages() {
    return {
      'required': 'Woah now, {{ field }} is required.',
      'unique': 'Wait a second, {{ field }} already exists',
      'min': 'min failed on title'
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

module.exports = Project
