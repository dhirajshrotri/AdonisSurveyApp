'use strict'

const Survey = use('App/Models/Survey')
const User = use('App/Models/User')
const Database = use('Database')

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
        await user.survey().where('surveyId', surveyId).update({'surveyName': surveyName, 'surveyDesc': surveyDesc})
        response.redirect('/users/'+id+'/surveys/'+surveyId)
    }

    async show({view, params:{id, surveyId} }){
        const survey = await Survey.find(surveyId)
        var question = await Database.from('questions').rightOuterJoin('answertypes', 'questions.questionId', 'answertypes.question_Id').where('questions.survey_Id', surveyId)
        let option = []
        for (let index = 0; index < question.length; index++) {
            const temp = await Database.from('no_of_choices').where('question_Id', question[index].questionId)
            option.push(temp)
        }
        return view.render('showsurvey', {
            survey: survey,
            question: question,
            option: option,
            id: id,
            surveyId: surveyId      
        })
    }

    async destroy({params:{id, surveyId}, response}){
        const user = await User.find(id)
        await user.survey().where('surveyId', surveyId).delete()
        response.redirect('/users/'+id)
    }
    
}

module.exports = SurveyController