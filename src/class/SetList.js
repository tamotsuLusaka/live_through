export default class SetList{

  id = null
  name = null
  lists = [] //{type: "mc" or "music", id: Key, order: Number, truckNumber: Number, displayOrder: Number} オブジェクトを生成する時にtruckNumberをnullで保存しとく
  isSe = false
  se =  {typeOfSource: null, nameOfSource: null, textForOpen: null, textForClose: null, truckNumber: null}
  isEndSe = false
  endSe = {typeOfSource: null, nameOfSource: null, textForOpen: null, textForClose: null, truckNumber: null}
  isEncore = false
  listsOfEncore = [] //{type: "mc" or "music", id: Key, order: Number, truckNumber: Number}
  isSeOfEncore = false
  seOfEncore = {typeOfSource: null, nameOfSource: null, textForOpen: null, textForClose: null, truckNumber: null}
  isEndSeOfEncore = false
  endSeOfEncore = {typeOfSource: null, nameOfSource: null, textForOpen: null, textForClose: null, truckNumber: null}
  output = {channel: null, terminal: null,} //{channel: "モノ" or "ステレオ" or "3ch〜8ch", terminal: "XLR" or "フォン" or "RCA（ピン）" or ステレオミニプラグ}
  text = null
  userId = null
  createdAt = null
  updatedAt = null
  addition = null

  constructor(setList){
    if(setList == null){return}
    this.id = setList.id
    this.name = setList.name
    this.lists = setList.lists
    this.isSe = setList.isSe
    this.se = setList.se
    this.isEndSe = setList.isEndSe
    this.endSe = setList.endSe
    this.isEncore = setList.isEncore
    this.listsOfEncore = setList.listsOfEncore
    this.isSeOfEncore = setList.isSeOfEncore
    this.seOfEncore = setList.seOfEncore
    this.isEndSeOfEncore = setList.isEndSeOfEncore
    this.endSeOfEncore = setList.endSeOfEncore
    this.output = setList.output
    this.text = setList.text
    this.userId = setList.userId
    this.createdAt = setList.createdAt
    this.updatedAt = setList.updatedAt
    this.addition = setList.addition
  }

}