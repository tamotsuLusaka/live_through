export default class Music{

  id = null
  name = null
  tune = null //UP, MID, SLOW
  textForSound = null
  textForLighting = null
  isSource = false
  source = {typeOfSource: null, nameOfSource: null, min: null, sec: null}
  userId = null
  createdAt = null
  updatedAt = null
  addition = null

  constructor(music){
    if(music == null){return}
    this.id = music.id
    this.name = music.name
    this.tune = music.tune
    this.textForSound = music.textForSound
    this.textForLighting = music.textForLighting
    this.isSource = music.isSource
    this.source = music.source
    this.userId = music.userId
    this.createdAt = music.createdAt
    this.updatedAt = music.updatedAt
    this.addition = music.addition
  }

}