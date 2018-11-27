// 'use strict'

// /*
// |--------------------------------------------------------------------------
// | Routes
// |--------------------------------------------------------------------------
// |
// | Http routes are entry points to your web application. You can create
// | routes for different URL's and bind Controller actions to them.
// |
// | A complete guide on routing is available here.
// | http://adonisjs.com/docs/4.1/routing
// |
// */

// /** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('home')
Route.on('/register').render('register')
// Route.on('/about').render('about')
// // Route.on('/admins').render('dashboard')
// Route.on('/login').render('signin')
Route.get('/admins/:adminId', 'AdminController.list').middleware(['findAdmin'])
// Route.post('/login', 'AdminController.login')//.middleware('signIn')
// //Route.on('/admins/:adminId/surveys/:surveyId/addquestion').render('addquestion')
// Route.post('/admins', 'AdminController.store')
// //Route.get('/admins', 'AdminController.index')
// //Route.get('/admins/:adminId', 'AdminController.show')//.middleware(['findAdmin'])
// Route.patch('/admins/:adminId', 'AdminController.patch').middleware(['findAdmin'])
// Route.delete('/admins/:adminId', 'AdminController.delete').middleware(['findAdmin'])
// Route.get('/profile', 'AdminController.profile').middleware('auth')
Route.get('/admins/:adminId/surveys', 'SurveyController.index')//.middleware(['findAdmin'])
Route.post('/admins/:adminId/surveys', 'SurveyController.store')//.middleware(['findAdmin'])//.middleware(['findSurvey'])
Route.get('/admins/:adminId/surveys/:surveyId', 'SurveyController.show')//.middleware(['findAdmin']).middleware(['findSurvey'])
Route.post('/admins/:adminId/surveys/:surveyId/questions', 'QuestionController.store')

// Route.delete('/admins/:adminId/surveys/:surveyId', 'SurveyController.delete')//.middleware(['findAdmin']).middleware(['findSurvey'])

// Route.post('/admins/:adminId/surveys/:surveyId/questions', 'QuestionController.store')
// Route.get('/admins/:adminId/surveys/:surveyId/questions/:questionId', 'QuestionController.show')
// Route.get('/admins/:adminId/surveys/:surveyId/edit', 'SurveyController.edit')
// Route.put('/admins/:adminId/surveys/:surveyId/', 'SurveyController.update')
// // Route.get('/admins/:adminId/surveys/:surveyId/questions/:questionId', 'QuestionController.index')

// Route.on('register').render('auth/register')//, 'AuthController.showRegisterPage')
Route.post('register', 'AdminController.store')
Route.on('/login').render('signin')
Route.post('/login', 'AdminController.login')