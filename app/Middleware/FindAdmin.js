'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Admin = use('App/Models/Admin')
const Database = use('Database')
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
    const admin = await Database.from('admins').where('adminId', adminId)

    //console.log(admin)
    if (!admin) {
      return response.status(404).json({
        message: 'Admin not found!', 
        adminId
      }) 
    }
    request.body = admin
    
    await next()
    
  }
}

module.exports = FindAdmin