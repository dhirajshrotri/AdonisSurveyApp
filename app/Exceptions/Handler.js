'use strict'
const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
 

  async handle (error, session,  request, response ) {
    if (error.name === 'ValidationException') {
      session.withErrors(error.messages).flashAll()
      //await session.commit()
      response.redirect('back')
      return
    }
    if(error.name === "InvalidSessionException"){
      //await session.commit()
      session.flash({
        type:'success',
        notification: 'Your session has expired. Please login again to continue.'
      })
      response.redirect('/login')
      return
    }
    //response.status(error.status).send(error.message)
    return super.handle(...arguments)
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler
