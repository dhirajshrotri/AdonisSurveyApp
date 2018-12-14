'use strict'

const Survey = use('App/Models/Survey')
const User = use('App/Models/User')
const randomString = require('random-string')

class SurveyController {

    async index ({ params:{ id }, view }) {
        return view.render('makesurvey', {
            id: id
        })
    }

    async store({ request, response, params:{id} }){
        const user = await User.find(id)
        //create a new survey instance
        const survey = new Survey()
         
        survey.surveyName = request.input('surveyName')
        survey.surveyDesc = request.input('surveyDesc')
        //survey.adminId = params.adminId
        await user.survey().save(survey)
        response.redirect('/users/'+id+'/surveys/'+survey.surveyId)
        
    }

    async edit({ params:{id, surveyId}, view }){
        //console.log(params)
        const survey = await Survey.find(surveyId)
        //console.log(survey)
        return view.render('surveyedit', {
            survey: survey,
            id: id
        })
    }

    async update({ request, response, params:{id, surveyId}}){
        const survey = await Survey.find(surveyId)
        const user = await User.find(id)
        //update the survey fields
        const surveyName = request.input('surveyName')
        const surveyDesc = request.input('surveyDesc')
        if(!surveyName){
            surveyName = survey.surveyName
        }
        if(!surveyDesc){
            surveyDesc = survey.surveyDesc
        }
        //console.log(surveyName)
        //console.log(surveyDesc)
        await user.survey().where('surveyId', surveyId).update({'surveyName': surveyName, 'surveyDesc': surveyDesc})
        response.redirect('/users/'+id+'/surveys/'+surveyId)
    }

    async show({view, params:{id, surveyId} }){
        const survey = await Survey.find(surveyId)
        //console.log(survey)
        const question = await survey.question().fetch()
        const tempQuestion = question.toJSON()
        //console.log(tempQuestion)
        return view.render('showsurvey', {
            survey : survey,
            id: id,
            tempQuestion: tempQuestion
        })
    }

    async destroy({params:{id, surveyId}, response}){
        //const survey = await Survey.find(surveyId)
        const user = await User.find(id)
        //console.log(admin)
        //console.log(surveyId)
        await user.survey().where('surveyId', surveyId).delete()

        response.redirect('/users/'+id)
    }

    async viewResults({params:{id, surveyId}, view}){
        const survey = await Survey.find(surveyId)
        const questions = await survey.question().fetch()
        const answers = await questions.answer().fetch()
        //console.log(questions.toJSON())
    }
    
}

module.exports = SurveyController