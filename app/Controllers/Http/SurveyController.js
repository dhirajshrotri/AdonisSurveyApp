'use strict'

const Survey = use('App/Models/Survey')
const Admin = use('App/Models/Admin')
class SurveyController {

    async index ({ request, response, view }) {
        return view.render('makesurvey')
    }

    async store({ request, response, params:{adminId, surveyId} }){
        const admin = await Admin.find(adminId)
        //create a new survey instance
        const survey = new Survey()
        //console.log(Admin.find(1))
        //console.log(request.input('surveyName'))    
        survey.surveyName = request.input('surveyName')
        survey.surveyDesc = request.input('surveyDesc')
        //survey.adminId = params.adminId
        await admin.survey().save(survey)
        response.redirect('/admins/'+adminId)
        // response.status(201).json({
        //    message: 'Survey created successfully!',
        //    data: survey
        // })
    }

    async edit({ request, response, params:{adminId, surveyId}, view }){
        //console.log(params)
        const survey = await Survey.find(surveyId)
        //console.log(survey)
        return view.render('surveyedit', {
            survey: survey,
            adminId: adminId
        })
    }

    async update({ request, response, params:{adminId, surveyId}, view }){
        const survey = await Survey.find(surveyId)
        const admin = await Admin.find(adminId)
        // console.log(survey)
        // console.log(admin)
        //update the survey fields
        const surveyName = request.input('surveyName')
        const surveyDesc = request.input('surveyDesc')

        // survey.surveyName = surveyName
        // survey.surveyDesc = surveyDesc
        //console.log(params.adminId)
        //save the survey
        //await admin.survey().save()
        await admin.survey().where('surveyId', surveyId).update({'surveyName': surveyName}, {'surveyDesc': surveyDesc})
        response.redirect('/admins/'+adminId+'/surveys/'+surveyId)
    }

    async show({view, params:{adminId, surveyId} }){
        const survey = await Survey.find(surveyId)
        //console.log(survey)
        const question = await survey.question().fetch()
        const tempQuestion = question.toJSON()
        //console.log(tempQuestion)
        return view.render('showsurvey', {
            survey : survey,
            adminId: adminId,
            tempQuestion: tempQuestion
        })
    }

    async destroy({params:{adminId, surveyId}, response}){
        //const survey = await Survey.find(surveyId)
        const admin = await Admin.find(adminId)
        //console.log(admin)
        //console.log(surveyId)
        await admin.survey().where('surveyId', surveyId).delete()

        response.redirect('/admins/'+adminId)
    }
}

module.exports = SurveyController