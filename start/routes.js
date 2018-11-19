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

Route.on('/').render('welcome')

Route.post('/admins', 'AdminController.store')
Route.get('/admins', 'AdminController.index')
Route.get('/admins/:id', 'AdminController.show').middleware(['findAdmin'])
Route.patch('/admins/:id', 'AdminController.patch').middleware(['findAdmin'])
Route.delete('/admins/:id', 'AdminController.delete').middleware(['findAdmin'])

Route.post('/admins/:id/surveys', 'SurveyController.store')//.middleware(['findSurvey'])
Route.get('/admins/:id/surveys/:id', 'SurveyController.index').middleware(['findAdmin']).middleware(['findSurvey'])
Route.patch('/admins/:id/surveys/:id', 'SurveyController.patch').middleware(['findAdmin']).middleware(['findSurvey'])
Route.delete('/admins/:id/surveys/:id', 'SurveyController.delete').middleware(['findAdmin']).middleware(['findSurvey'])

