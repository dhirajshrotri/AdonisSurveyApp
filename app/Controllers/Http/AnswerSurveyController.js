'use strict'
const SurveyToken = use('App/Models/SurveyToken')
const Question = use('App/Models/Question')
const Answer = use('App/Models/Answer')
const Survey = use('App/Models/Survey')
const Database = use('Database')

class AnswerSurveyController {
    
    
    async index({params:{token}, view, response}){
        const surveytoken = await SurveyToken.query().where('token', token).fetch()
        const expiry = Date.now()
        const survey_token = surveytoken.toJSON()
        if(survey_token[0].tokenExpires > expiry){
            //const question = await Question.query().select('questionId').where('survey_Id', survey_token[0].survey_Id).fetch()
            return view.render('getstarted', {
                surveyId: survey_token[0].survey_Id
            })
           
        }
        return response.status(201).json({
            message: "The token has expired."
        })
    }
    async show({params:{surveyId}, view, response}){
        var survey = await Survey.find(surveyId)
        var question = await Database.from('questions').rightOuterJoin('answertypes', 'questions.questionId', 'answertypes.question_Id').where('questions.survey_Id', surveyId)
        let option = []
        for (let index = 0; index < question.length; index++) {           
            const temp = await Database.from('no_of_choices').where('question_Id', question[index].questionId)
            option.push(temp)      
        }
      
        console.log(question[0].questionId)
        survey = survey.toJSON()
        return view.render('fillsurvey', {
            question: question,
            survey: survey,
            option: option,
        })
    }

    async modify({params:{surveyId, questionId}, view}){
        const answer = await Answer.query().where('questionId', questionId).fetch()
        const question = await Question.find('questionId')
        
        return view.render('fillsurvey', {
            question : question.toJSON(),
            answer: answer.toJSON()
        })
        
    }

    async update({params: {surveyId, questionId}, request, response}){
        const answerText = request.input('answer')
        await Answer.where('questionId', questionId).update('answerText', answerText)
        return response.redirect('back')
    }
}

module.exports = AnswerSurveyController
