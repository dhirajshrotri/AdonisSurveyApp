'use strict'
const {sanitizor} = use('Validator')

class Slugify {
  register (Model, customOptions = {}) {
    Model.addHook('beforeCreate', (modelInstance)=>{
      //create Slug
      const slug = sanitizor.slug(modelInstance.surveyName)
      console.log(slug)
    })
  }
}

module.exports = Slugify
