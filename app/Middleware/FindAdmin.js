'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Admin = use('App/Models/Admin')

class FindAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: {id} }, next) {
    // call next to advance the request
    //console.log('MiddleWare fired!')
    const admin = await Admin.find(id)

    if (!admin) {
      return response.status(404).json({
        message: 'Admin not found!', 
        id
      }) 
    }
    request.body.admin = admin
    await next()
  }
}

module.exports = FindAdmin