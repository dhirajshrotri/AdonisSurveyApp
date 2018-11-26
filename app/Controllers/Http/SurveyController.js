'use strict'

const Survey = use('App/Models/Survey')
const Admin = use('App/Models/Admin')
class SurveyController {

    async index ({ request, response, view }) {
        return view.render('makesurvey')
    }

    async store({ request, response, params }){
        const admin = Admin.find(params.adminId)
        const survey = new Survey()
        console.log(Admin.find(1))
        //console.log(request.input('surveyName'))    
        survey.surveyName = request.input('surveyName')
        survey.surveyDesc = request.input('surveyDesc')
        //survey.adminId = params.adminId
        await admin.survey().save(survey)

        response.status(201).json({
           message: 'Survey created successfully!',
           data: survey
        })
    }

    async edit({ request, response, params, view }){
        console.log(params)
        const survey = await Survey.find(params.surveyId)
        console.log(survey)
        return view.render('surveyedit', {
            survey: survey
        })
    }

    async update({ request, response, params, view }){
        const survey = await Survey.find(params.surveyId)

        survey.surveyName = request.input('surveyName')
        survey.surveyDesc = request.input('surveyDesc')
        survey.adminId = params.adminId
        //console.log(params.adminId)
        await survey.save()
    }

    async show({ request, response, view, params }){
        //console.log(request.post())
        return view.render('showsurvey', {
             survey : request.post(),
             adminId: params.adminId
        })
    }
}

module.exports = SurveyController
