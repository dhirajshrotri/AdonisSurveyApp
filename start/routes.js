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

Route.on('/').render('home')
Route.on('/register').render('register')
Route.get('/admins/:adminId/surveys/:surveyId/questions/:questionId/edit','QuestionController.edit')
Route.get('/admins/:adminId/surveys/:surveyId/edit', 'SurveyController.edit')
Route.put('/admins/:adminId/surveys/:surveyId', 'SurveyController.update')
Route.put('/admins/:adminId/surveys/:surveyId/questions/:questionId', 'QuestionController.update')
Route.get('/admins/:adminId', 'AdminController.list').middleware(['findAdmin'])
Route.get('/admins/:adminId/surveys', 'SurveyController.index')//.middleware(['findAdmin'])
Route.post('/admins/:adminId/surveys', 'SurveyController.store')//.middleware(['findAdmin'])//.middleware(['findSurvey'])
Route.get('/admins/:adminId/surveys/:surveyId', 'SurveyController.show')//.middleware(['findAdmin']).middleware(['findSurvey'])
Route.post('/admins/:adminId/surveys/:surveyId/questions', 'QuestionController.store')
Route.get('/admins/:adminId/surveys/:surveyId/delete', 'SurveyController.destroy')
Route.get('/admins/:adminId/surveys/:surveyId/questions/:questionId/delete', 'QuestionController.destroy')
Route.get('/admins/:adminId/edit', 'AdminController.edit')
Route.put('/admins/:adminId', 'AdminController.update')
Route.post('register', 'AdminController.store')
Route.on('/login').render('signin')
Route.post('/login', 'AdminController.login')