'use strict'
const Hash = use('Hash')
const Admin = exports = module.exports = {}

Admin.encryptPassword = async (admin)=>{
    admin.password = await Hash.make(admin.password)
}

Admin.validate = async (admin) =>{
    if(!admin.email){
        throw new Error('Email is required!')
    }
    if(!admin.password){
        throw new Error('Password is required!')
    }
}