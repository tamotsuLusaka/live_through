export default class Idol{

  id = null
  type = null //"idol"
  name = null
  lists = [] //[{id: String, name: String, micNumber: Number}]
  isBroughtMic = false
  mic = {type: null, text: null} // type: (line)
  source = {type: null, other: null, channel: null, terminal: null}
  isBroughtMonitor = false
  monitor = {type: null, channel: null}//type: (line), channel: (twoChannel)
  text = null
  userId = null
  createdAt = null
  updatedAt = null

  constructor(idol){
    if(idol == null){return}
    this.id = idol.id
    this.type = idol.type
    this.name = idol.name
    this.lists = idol.lists
    this.isBroughtMic = idol.isBroughtMic
    this.mic = idol.mic
    this.source = idol.source
    this.isBroughtMonitor = idol.isBroughtMonitor
    this.monitor = idol.monitor
    this.text = idol.text
    this.userId = idol.userId
    this.createdAt = idol.createdAt
    this.updatedAt = idol.updatedAt

  }

}