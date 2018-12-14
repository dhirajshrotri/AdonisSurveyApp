'use strict'
const SurveyToken = use('App/Models/SurveyToken')
const Question = use('App/Models/Question')
const Answer = use('App/Models/Answer')
const Survey = use('App/Models/Survey')
const Answertype = use('App/Models/Answertype')
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
        var questions = await Question.query().where('survey_Id', surveyId).fetch()
        questions = questions.toJSON()
        var answertype = await Answertype.query().where('question_Id', questions[0].questionId).fetch()
        answertype = answertype.toJSON()
        //const choice = await NoOfChoices.query().where('answertype_Id', answertype.)
        //console.log(answertype.toJSON())
        return view.render('fillsurvey', {
            survey: survey,
            questions : questions,
            answertype : answertype.toJSON()
        })
        
    }

    async store({params:{surveyId}, request, response}){
        
        const answerText = request.input('answer')
        const question = await Question.query().where('survey_Id', surveyId).fetch()
        const questionTemp = question.toJSON()
        for (let index = 0; index < answerText.length; index++) {
            const answer = new Answer()
            answer.answerText = answerText[index]
            answer.question_Id = questionTemp[index].questionId
            await answer.save()
            //await question[index].answer().save(answer)
            //console.log(questionTemp[index])
        }
        return response.redirect('/surveys/'+surveyId+'/thankyou')
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
