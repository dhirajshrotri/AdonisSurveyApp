'use strict'
const SurveyToken = use('App/Models/SurveyToken')
const Question = use('App/Models/Question')
const Answer = use('App/Models/Answer')
const Survey = use('App/Models/Survey')
class AnswerSurveyController {

    async index({params:{token}, view, response}){
        const surveytoken = await SurveyToken.query().where('token', token).fetch()
        const expiry = Date.now()
        const survey_token = surveytoken.toJSON()
        //console.log(survey_token)
        if(survey_token[0].tokenExpires > expiry){
            //const question = await Question.query().select('questionId').where('survey_Id', survey_token[0].survey_Id).fetch()
            return view.render('getstarted', {
                surveyId: survey_token[0].survey_Id
            })
            //console.log(question.toJSON())    
        }
        return response.status(201).json({
            message: "The token has expired."
        })
    }
    async show({params:{surveyId}, view, response}){
        const survey = await Survey.find(surveyId)
        const questions = await Question.query().where('survey_Id', surveyId).fetch()
        return view.render('fillsurvey', {
            survey: survey,
            questions : questions.toJSON()
        })
        
    }

    async store({params:{surveyId}, request}){
        const answer = new Answer()
        const answerText = request.input('answer')
        const question = await Question.query().where('survey_Id', surveyId).fetch()
        for (let index = 0; index < answerText.length; index++) {
            answer.answerText = answerText[index];
            await question.answer().save(answer)
        }
        //await question.answer().save(answer)
        //return response.redirect('')
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
