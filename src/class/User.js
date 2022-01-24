export default class User{

  id = null
  name = null
  email = null
  prefecture = null
  city = null
  createdAt = null
  updatedAt = null

  constructor(user){
    if(user == null){return}
    this.id = user.id
    this.name = user.name
    this.email = user.email
    this.prefecture = user.prefecture
    this.city = user.city
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
  }

}