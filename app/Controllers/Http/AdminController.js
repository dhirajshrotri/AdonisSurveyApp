'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Admin = use('App/Models/Admin')
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
  async store ({ request, response }) {
    //const post = new Post()

    const {firstName, lastName, email, password} = request.post()

    const admin = await Admin.create({firstName, lastName, email, password})
    
    response.status(201).json({
      message: 'Successfully created a new admin.',
      data: admin 
    })
    
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
  async show ({request, response, params: {adminId}, view}) {
    //console.log(adminId)
  
    //await next()
    // response.status(200).json({
    //   message: 'Here is your admin!', 
    //   data: request.post()
    // })
    return view.render('dashboard', {
      title: 'Welcome!', 
      admins: request.post()
    })
  }

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
  async patch ({ params, request, response }) {
    const { firstName, lastName, email, admin } = request.post()

    admin.firstName = firstName
    admin.lastName = lastName
    admin.email = email

    await admin.save()

    response.status(200).json({
      message: 'Successfully updated this admin.',
      data: admin
    })

  }

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
}

module.exports = AdminController