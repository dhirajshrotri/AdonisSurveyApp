'use strict'
const Hash = use('Hash')
const Admin = exports = module.exports = {}

Admin.method = async (modelInstance) => {

}

Admin.encryptPassword = function * (next){
    this.password = Hash.make(this.password)
    next
}