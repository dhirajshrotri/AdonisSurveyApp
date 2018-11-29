'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Admin = use('App/Models/Admin')
//const Hash = use('Hash')
//const Mail = use('App/Models/Admin')
const Database = use('Database')
const { validate } = use('Validator')
/**
 * Resourceful controller for interacting with admins
 */
class AdminController {
  /**
   * Show a list of all admins.
   * GET admins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({response}) {
    const admins = await Admin.all()

    response.status(200).json({
      message: 'Here are your admins.',
      data: admins.toJSON()
    })
  }

  async showLogin(view){
    return view.render('signin')
  }
  async login ({request, response}){
    const email = request.input('email')
    const password = request.input('password')

    const admin = await Database.select('*').from('admins').where('email', email)
    if(admin[0].password === password){
      return response.redirect('/admins/'+admin[0].adminId+'/')
    }
    // console.log(email)
    // console.log(password)
    // const email = request.input('email')
    // const password = request.input('password')
    // const login = request.auth.attempt(email, password)

    // if(login){
    //   response.send('Logged In successfully')
    //   return
    // }

    // response.unauthorised('Invalid Credentials')
   //console.log("Route to signIn hit")
   //console.log(request.post()) 
  }

  * profile(request, response){
    const admin = request.auth.getAdmin()
    
    if(admin){
      response.ok(admin)
      return
    }

    response.unauthorised('You must be logged in to view your profile!')
  }
  /**
   * Render a form to be used for creating a new admin.
   * GET admins/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  // async create ({ request, response, view }) {
    
  // }

  /**
   * Create/save a new admin.
   * POST admins
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, session }) {
    const rules = {
      firstName: 'required',
      lastName: 'required',
      email: 'required|email|unique:admins,email',
      password: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      // console.log('validation failed. please try again')
      // session.flash({notification: 'Validation failed. Please try again.'})
      session.withErrors(validation.messages()).flashAll()
    } else{
      const admin = new Admin()
      admin.email = request.input('email')
      admin.firstName = request.input('firstName')
      admin.lastName = request.input('lastName')
      admin.password = request.input('password')

      await admin.save()
      session.flash({ notification: 'User Registered!' })
      
      return response.redirect('/login')
    }
    
  }

  /**
   * Display a single admin.
   * GET admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  // async show ({request, response, params: {adminId}, view}) {
  //   //console.log(adminId)
  
  //   //await next()
  //   // response.status(200).json({
  //   //   message: 'Here is your admin!', 
  //   //   data: request.post()
  //   // })
  //   console.log(adminId)
  //   // return view.render('dashboard', {
  //   //   title: 'Welcome!', 
  //   //   admins: request.post()
  //   // })
  // }

  /**
   * Render a form to update an existing admin.
   * GET admins/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  // async edit ({ params, request, response, view }) {
  // }

  /**
   * Update admin details.
   * PUT or PATCH admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  // async patch ({ params, request, response }) {
  //   const { firstName, lastName, email, admin } = request.post()

  //   admin.firstName = firstName
  //   admin.lastName = lastName
  //   admin.email = email

  //   await admin.save()

  //   response.status(200).json({
  //     message: 'Successfully updated this admin.',
  //     data: admin
  //   })

  // }

  /**
   * Delete a admin with id.
   * DELETE admins/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ request, response, params: {adminId} }) {
    const admin = request.post().admin
    
    await admin.delete()

    response.status(200).json({
      message: 'Successfully delete this admin.',
      data: adminId
    })
  }

  async list ({request, response, view, params: {adminId} }){
    //console.log(request.post()[0].firstName)
    const admin = await Admin.find(adminId)
    //console.log(admin)
    const adminSurvey = await admin.survey().fetch()
    const admin_Survey = adminSurvey.toJSON()
    //console.log(admin_Survey)
    return view.render('dashboard', {
      admin_Survey: admin_Survey,
      admin: admin
    })
    
  }

  async edit({view, params:{adminId}}){
    const admin = await Admin.find(adminId)

    return view.render('adminedit', {
      admin: admin
    })
  }

  async update({request, response, params:{adminId}}){
    const admin = await Admin.find(adminId)
    const firstName = request.input('firstName')
    const lastName = request.input('lastName')
    if(!firstName) {
      firstName = admin.firstName
    }
    if(!lastName){
      lastName = admin.lastName
    }
    await Database.table('admins').where('adminId', adminId).update({ 'firstName': firstName, 'lastName': lastName})
    response.redirect('/admins/'+adminId)
  }
}

module.exports = AdminController