'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')


class User extends Model {
  static get primaryKey () {
    return 'id'
  }
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/SoftDeletes')
    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })

    this.addHook('beforeCreate', 'User.validate')
  }
  survey(){
    return this.hasMany('App/Models/Survey')
  }

  isActive(){
    return this.hasOne('App/Models/IsActive')
  }

  PasswordReset(){
    return this.hasOne('App/Models/PasswordReset')
  }
  static get rules(){
    return {
       email: 'required|email|unique:users',
       password: 'required|confirmed|min:6'
    }
  }
  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = User
