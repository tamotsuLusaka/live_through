export default class Instrument{

  id = null
  type = null
  member = null
  position = {x: null, y: null, xSpan: 1, ySpan: 1}
  isVocal = false
  vocal = {part: null, monitor: 1} //part: "ボーカル", "コーラス", "MC", monitor モニターの数にはバリデーションかけずに選ばなければ初期値の1を入れている。ドラム専用を作ることを回避するため。コーラス選ばなければ数は変更できない。書き出しの時にコーラス以外はこの数字を反映させない。
  isBroughtMic = false
  mic = {type: null, brand: null, model: null} // type: (line)
  isAmp = false
  amp = {type: null, brandOfHead: null, brandOfCab: null, brandOfCombo: null, position:{x: null, y: null, xSpan: 1, ySpan: 1}} // type: ここはidを保存 "rent","rentCombo", "head", "cab", "head&cab", "combo" 
  idBroughtDi = false
  di = {brand: null, model: null}
  // isDrum = false
  drum = {
    rent: null,
    bring: null,
    tom: null
  }
  // isPercussion = false
  percussion = {
    bring: null,
    other: null
  }
  isLineOutForAcousticGuitar = false
  acousticGuitar = {type: null, text: null} //type: "マイク", "ライン", "ライン&マイク"
  isRentedKeyboard = false
  rentKeyboard = {number: null}
  bringKeyboardLists = [] //{name: String, channel: (twoChannel), terminal: (terminal), isDi: Bool}
  isAmpForKeyboard = false
  ampForKeyboard = {type: null} //type: "レンタル", "持ち込み" (ampForKeyboard)
  // isMicForInstrument = false
  isBroughtMicForInstrument = false
  micForInstrument = {type: null, brand: null, model: null} // type: (line)"
  // isLineOut = false
  lineOutLists = [] //{name: String, channel: (twoChannel), terminal: (terminal), isDi: Bool}
  // isLineOutForViolin = false
  lineOutForViolin = {terminal: null, isDi: false} //terminal: (terminal), isDi: Bool
  etc = null
  isSync = false
  sync = {type: null, channel: null, terminal: null} //type: (sync), channel: (twoChannel), terminal: (terminal)
  isSyncForDrum = false
  syncForDrum = {type: null, channel: null, terminal: null, site: null} //type: (sync), channel: (twoChannel), terminal: (terminal), site: (site), 
  // isMonitor = false
  isBroughtMonitor = false
  monitor = {type: null, channel: null}//type: (line), channel: (twoChannel)
  isPower = false
  // text = null


  constructor(instrument){
    if(instrument == null){return}
    this.id = instrument.id
    this.type = instrument.type
    this.member = instrument.member
    this.position = instrument.position
    this.isVocal = instrument.isVocal
    this.vocal = instrument.vocal
    this.isBroughtMic = instrument.isBroughtMic
    this.mic = instrument.mic
    this.isAmp = instrument.isAmp
    this.amp = instrument.amp
    this.idBroughtDi = instrument.idBroughtDi
    this.di = instrument.di
    // this.isDrum = instrument.isDrum
    this.drum = instrument.drum
    // this.isPercussion = instrument.isPercussion
    this.percussion = instrument.percussion
    this.isLineOutForAcousticGuitar = instrument.isLineOutForAcousticGuitar
    this.acousticGuitar = instrument.acousticGuitar
    this.isRentedKeyboard = instrument.isRentedKeyboard
    this.bringKeyboardLists = instrument.bringKeyboardLists
    this.isAmpForKeyboard = instrument.isAmpForKeyboard
    this.ampForKeyboard = instrument.ampForKeyboard
    // this.isMicForInstrument = instrument.isMicForInstrument
    this.isBroughtMicForInstrument = instrument.isBroughtMicForInstrument
    this.micForInstrument = instrument.micForInstrument
    // this.isLineOut = instrument.isLineOut
    this.lineOutLists = instrument.lineOutLists
    // this.isLineOutForViolin = instrument.isLineOutForViolin
    this.lineOutForViolin = instrument.lineOutForViolin
    this.etc = instrument.etc
    this.isSync = instrument.isSync
    this.sync = instrument.sync
    this.isSyncForDrum = instrument.isSyncForDrum
    this.syncForDrum = instrument.syncForDrum
    // this.isMonitor = instrument.isMonitor
    this.isBroughtMonitor = instrument.isBroughtMonitor
    this.monitor = instrument.monitor
    this.isPower = instrument.isPower
    // this.text = instrument.text
  }

}