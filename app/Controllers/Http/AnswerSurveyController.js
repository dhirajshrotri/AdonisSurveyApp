'use strict'
const SurveyToken = use('App/Models/SurveyToken')
const Question = use('App/Models/Question')
const Answer = use('App/Models/Answer')
const Survey = use('App/Models/Survey')
const NoOfChoice = use('App/Models/NoOfChoice')
const Answertype = use('App/Models/Answertype')
const Database = use('Database')

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
        var survey = await Survey.find(surveyId)
        var question = await Database.from('questions').rightOuterJoin('answertypes', 'questions.questionId', 'answertypes.question_Id')
        let option = []
        for (let index = 0; index < question.length; index++) {
            const temp = await Database.from('no_of_choices').where('question_Id', question[index].questionId)
            option.push(temp)
        }
//        console.log(question)
        // console.log(option[0].option)
        return view.render('fillsurvey', {
            question: question,
            survey: survey.toJSON(),
            option: option
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
