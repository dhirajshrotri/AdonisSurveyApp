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
  async handle ({ request, response, params:{adminId}}, next) {
    // call next to advance the request
    //console.log('MiddleWare fired!')
    
    //console.log(request.post())
    const admin = await Admin.find(adminId)
    //console.log(admin)
    if (!admin) {
      return response.status(404).json({
        message: 'Admin not found!', 
        adminId
      }) 
    }
    request.body.admin = admin
    
    await next()
    
  }
}

module.exports = FindAdmin