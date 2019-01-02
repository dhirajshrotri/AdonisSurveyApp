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
Route.on('/about').render('about')
Route.on('/register').render('register')
Route.get('/auth/:provider', 'UserController.redirectToProvider').as('social.login')
Route.get('/authenticated/:provider', 'UserController.handleProviderCallback').as('social.login.callback')
// Route.get('/admins/:adminId/surveys/:surveyId/questions/:questionId/edit','QuestionController.edit')
// Route.get('/admins/:adminId/surveys/:surveyId/edit', 'SurveyController.edit')
// Route.put('/admins/:adminId/surveys/:surveyId', 'SurveyController.update')
// Route.put('/admins/:adminId/surveys/:surveyId/questions/:questionId', 'QuestionController.update')
// Route.get('/admins/:adminId', 'AdminController.profile').middleware('auth')//.middleware(['findAdmin'])
// Route.get('/admins/:adminId/surveys', 'SurveyController.index')//.middleware(['findAdmin'])
// Route.post('/admins/:adminId/surveys', 'SurveyController.store')//.middleware(['findAdmin'])//.middleware(['findSurvey'])
// Route.get('/admins/:adminId/surveys/:surveyId', 'SurveyController.show')//.middleware(['findAdmin']).middleware(['findSurvey'])
// Route.post('/admins/:adminId/surveys/:surveyId/questions', 'QuestionController.store')
// Route.get('/admins/:adminId/surveys/:surveyId/delete', 'SurveyController.destroy')
// Route.get('/admins/:adminId/surveys/:surveyId/questions/:questionId/delete', 'QuestionController.destroy')
// Route.get('/admins/:adminId/edit', 'AdminController.edit')
// Route.put('/admins/:adminId', 'AdminController.update')
// Route.post('register', 'AdminController.store')
// Route.on('/login').render('signin')
// Route.post('/login', 'AdminController.login')
Route.on('/recoverPassword').render('passwordrecovery')
Route.post('/recoverPassword', 'PasswordresetController.sendResetLink')
Route.get('/recoverPassword/:token', 'PasswordresetController.resetPass')
Route.post('/users/:id/recoverPassword', 'PasswordresetController.setPassword')
Route.post('/login', 'UserController.login')
Route.get('/login', 'UserController.checkLogin')
Route.get('/users', 'UserController.redirect')
Route.post('/register', 'UserController.store')
Route.get('/users/:id', 'UserController.profile').middleware('auth')
Route.get('/users/:id/logout', 'UserController.logout')
Route.get('/users/:id/edit', 'UserController.edit').middleware('auth')
Route.get('/users/:id/delete', 'UserController.destroy').middleware('auth')
Route.put('/users/:id', 'UserController.update').middleware('auth')
Route.get('/users/:id/resetPassword', 'UserController.resetPassword').middleware('auth')
Route.put('/users/:id/resetPassword', 'UserController.modifyPassword').middleware('auth')
Route.get('/users/:id/surveys', 'SurveyController.index').middleware('auth')
Route.post('/users/:id/surveys', 'SurveyController.store').middleware('auth')
Route.get('/users/:id/surveys/:surveyId/edit', 'SurveyController.edit').middleware('auth')
Route.put('/users/:id/surveys/:surveyId', 'SurveyController.update').middleware('auth')
//Route.get('/users/:id/surveys/:surveyId/viewResults', 'SurveyController.viewResults').middleware('auth')
Route.get('/users/:id/surveys/:surveyId/delete', 'SurveyController.destroy').middleware('auth')
Route.put('/users/:id/surveys/:surveyId/questions/:questionId', 'QuestionController.update').middleware('auth')
Route.get('/users/:id/surveys/:surveyId/questions/:questionId/edit', 'QuestionController.edit')
Route.get('/users/:id/surveys/:surveyId/questions/:questionId/delete', 'QuestionController.destroy').middleware('auth')
Route.post('/users/:id/surveys/:surveyId/questions', 'QuestionController.store').middleware('auth')
Route.get('/users/:id/surveys/:surveyId', 'SurveyController.show').middleware('auth')
Route.get('/users/:id/surveys/:surveyId/questions/:questionId/addAnswerType', 'AnswertypeController.index').middleware('auth')
Route.get('/users/:id/surveys/:surveyId/sendLink', 'SurveyTokenController.sendMail').middleware('auth')
Route.post('/users/:id/surveys/:surveyId/sendMail', 'SurveyTokenController.sendLink').middleware('auth')
Route.get('/users/:id/surveys/:surveyId/questions/:questionId/addAnswerType', 'AnswertypeController.index').middleware('auth')
Route.post('/users/:id/surveys/:surveyId/questions/:questionId/addChoices', 'AnswertypeController.store').middleware('auth')
Route.get('/users/:id/surveys/:surveyId/questions/:questionId/option/:choiceId/edit', 'AnswertypeController.edit').middleware('auth')
Route.get('/users/:id/surveys/:surveyId/questions/:questionId/option/:choiceId/delete', 'AnswertypeController.delete').middleware('auth')
Route.post('/users/:id/surveys/:surveyId/questions/:questionId/option/:choiceId/update', 'AnswertypeController.update').middleware('auth')
Route.get('/register/confirm/:token', 'UserController.confirmEmail')
Route.on('/register/plsConfirm').render('confirm')
Route.get('/users/:id/surveys/:surveyId/viewResults', 'AnswerController.index')
Route.get('/users/:id/surveys/:surveyId/questions/:questionId/viewResult', 'AnswerController.count')
Route.get('/surveys/:token', 'AnswerSurveyController.index')
Route.get('/surveys/:surveyId/show', 'AnswerSurveyController.show')
Route.post('/surveys/:surveyId/addAnswer', 'AnswerController.store')
Route.get('/surveys/:surveyId/preview', 'AnswerSurveyController.preview')
Route.post('/surveys/:surveyId/preview', 'AnswerSurveyController.submit')
Route.get('/surveys/:surveyId/edit', 'AnswerSurveyController.edit')
Route.on('/surveys/:surveyId/thankyou').render('thankyou')