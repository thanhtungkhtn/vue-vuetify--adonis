'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('welcome')

Route.get('/', () => {
  return {
    greeting: 'Hello world in JSON'
  }
})


//Route.on('/signup').render('auth.signup'); // render auth/signup.edge
//Route.post('/signup', 'UserController.create').validator('Register');
Route.group(() => {
  Route.post('/auth/login', 'UserController.login').validator('Login');
  Route.post('/auth/register', 'UserController.create').validator('Register');
  Route.get('/getuser/:id', 'UserController.show')
}).prefix('/api')

// Route.post('/api/auth/login', 'UserController.login').validator('Login');
// Route.post('/api/auth/register', 'UserController.create').validator('Register');

Route.group(() => {

  Route.patch('contacts/:id', 'ContactController.update').validator('Contact')
  Route.delete('contacts/:id', 'ContactController.destroy')
  Route.post('contacts', 'ContactController.store').validator('Contact')
  Route.get('contacts', 'ContactController.index')

  Route.get('projects', 'ProjectController.index')
  Route.post('projects', 'ProjectController.store').validator('Project')
  Route.delete('projects/:id', 'ProjectController.destroy')
  Route.patch('projects/:id', 'ProjectController.update').validator('Project')

  Route.get('projects/:id/tasks', 'TaskController.index')
  Route.post('projects/:id/tasks', 'TaskController.store').validator('Task')
  Route.delete('tasks/:id', 'TaskController.destroy')
  Route.patch('tasks/:id', 'TaskController.update').validator('Task')

}).prefix('api').middleware('auth')

