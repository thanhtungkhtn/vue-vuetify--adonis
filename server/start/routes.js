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


Route.group(() => {
  // user signup
  Route.post('/auth/signup', 'AuthController.signup').validator('Register');
  // user login
  Route.post('/auth/login', 'AuthController.login').validator('Login');

  Route.get('/getuser/:id', 'AuthController.show')
}).prefix('/api')

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

// user account
Route.group(() => {
  Route.get('/me', 'UserController.me')
  Route.put('/update_profile', 'UserController.updateProfile')
  Route.put('/change_password', 'UserController.changePassword')
})
  .prefix('account')
  .middleware(['auth:jwt'])

// User profile
Route.get(':username', 'UserController.showProfile')

Route.group(() => {
  Route.get('/timeline', 'UserController.timeline')
  Route.post('/follow', 'UserController.follow')
  Route.get('/users_to_follow', 'UserController.usersToFollow')
  Route.delete('/unfollow/:id', 'UserController.unFollow')
})
  .prefix('users')
  .middleware(['auth:jwt'])

Route.post('/tweet', 'TweetController.tweet').middleware(['auth:jwt'])
Route.get('tweets/:id', 'TweetController.show')
Route.post('tweets/reply/:id', 'TweetController.reply').middleware(['auth:jwt']);
// Delete tweet
Route.delete('tweets/destroy/:id', 'TweetController.destroy').middleware(['auth:jwt'])


// tweet reactions
Route.group(() => {
  // favorite tweet
  Route.post('/create', 'FavoriteController.favorite')
  // unfavorite tweet
  Route.delete('/destroy/:id', 'FavoriteController.unFavorite')
})
  .prefix('favorites')
  .middleware(['auth:jwt'])
