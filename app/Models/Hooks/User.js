'use strict'

const Hash = use('Hash')

const UserHook = module.exports = {}

/**
 * Hash using password as a hook.
 *
 * @method
 *
 * @param  {Object} userInstance
 *
 * @return {void}
 */
UserHook.hashPassword = async (userInstance) => {
  if (userInstance.dirty.password) {
    userInstance.password = await Hash.make(userInstance.password)
  }
}

UserHook.validate = async (userInstance) => {
  if(!userInstance.email){
    throw new Error('Email is required!')
  }
  if(!userInstance.password){
    throw new Error('Password is required!')
  }
}