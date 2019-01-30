'use strict'
const {sanitizor} = use('Validator')
const Survey = use('App/Models/Survey')

class Slugify {
  register (Model, customOptions = {}) {
    Model.addHook('afterCreate', (modelInstance)=>{
      // console.log(modelInstance.user_id)
      //create Slug
      // const survey = await Survey.query().where('user_id', modelInstance.user_id).fetch()
      // console.log(survey)
      const slug = sanitizor.slug(survey.surveyName)
      console.log(slug)
      //const survey = await Survey.query().where('surveyId', modelInstance.surveyId).update({'surveySlug': slug})
      // await survey.save()
    
    })
  }
}

module.exports = Slugify
