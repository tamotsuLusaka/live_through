export default class Band{

  id = null
  type = null //"band" or "idol"
  name = null
  lists = [] //instrumentを直接持つ
  text = null
  userId = null
  createdAt = null
  updatedAt = null

  constructor(band){
    if(band == null){return}
    this.id = band.id
    this.type = band.type
    this.name = band.name
    this.lists = band.lists
    this.text = band.text
    this.userId = band.userId
    this.createdAt = band.createdAt
    this.updatedAt = band.updatedAt
  }

}