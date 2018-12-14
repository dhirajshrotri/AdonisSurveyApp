'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const surveyToken = use('App/Models/SurveyToken')
const Survey = use('App/Models/Survey')
const sgMail = require('@sendgrid/mail')
const randomString = require('random-string')

sgMail.setApiKey('sendgrid key')
/**
 * Resourceful controller for interacting with surveytokens
 */
class SurveyTokenController {
  async sendMail({view, auth, params:{id, surveyId}}){
        const user = await auth.getUser()
        const survey = await user.survey().where('surveyId', surveyId).fetch()
        return view.render('sendmail', {
            user:user,
            surveyId: surveyId
        })
  }

  async sendLink({auth, request, response, session, params:{id, surveyId}}){
    const user = await auth.getUser()
    const emails = request.input('emails').split(",")
    //console.log(emails)
    const token = randomString({length:40})
    const tokenExpires = Date.now()+8640000
    const survey = await Survey.find(surveyId)
    const surveyLink = new surveyToken()
    const headers = request.headers()
    surveyLink.token = token
    surveyLink.tokenExpires = tokenExpires
    await survey.surveyToken().save(surveyLink)

      emails.forEach(element => {
        const msg = {
          to: element,  
          from: 'noreply@surveyor.com',
          subject: 'Survey Invite',
          html: '<p> You have been invited to fill out a survey!Please click on the link below to fill out the survey</p>'+'<p>http://'+headers.host+'/surveys/'+token+'</p>',
        }
        sgMail.send(msg);
        session.flash({
          type:'success', 
          notification: 'We have sent a link to the Emails to fill out the survey!' 
        })
        return response.redirect('/users/'+user.id)
      })
      
    
  }
}

module.exports = SurveyTokenController