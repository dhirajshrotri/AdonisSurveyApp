'use strict'

class AnswerTypeController {
    // async Textbox({request, response}){
    //     console.log('Textbox')
    // }
    // async Radio({request, response}){
    //     console.log('Radio')
    // }
    // async Checkbox({request, response}){
    //     console.log('Checkbox')
    // }
    async index({view, params:{
        id, surveyId, questionId
    }}){
        return view.render('addAnswerType', {
            id:id,
            questionId:questionId,
            surveyId:surveyId
        })
    }
    async store({what}){
        console.log(what.value)
    }
}

module.exports = AnswerTypeController
