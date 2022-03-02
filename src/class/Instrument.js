export default class Instrument{

  id = null
  type = null
  member = null
  position = {x: null, y: null, xSpan: 1, ySpan: 1}
  isVocal = false
  vocal = {part: null} //"ボーカル", "コーラス", "MC"
  isBroughtMic = false
  mic = {type: null, brand: null, model: null} // type: (line)
  isAmp = false
  amp = {type: null, brandOfHead: null, brandOfCab: null, brandOfCombo: null, position:{x: null, y: null, xSpan: 1, ySpan: 1}} // type: ここはidを保存 "rent","rentCombo", "head", "cab", "head&cab", "combo" 
  idBroughtDi = false
  di = {brand: null, model: null}
  // isDrum = false
  drum = {
    rent: {bass: false, snare: false, hiHat: false, floorTom: false, tom13: false, tom12: false, rideCymbal: false, crash18: false, crash16: false, kickPedal: false},
    bring: null
  }
  // isPercussion = false
  percussion = {
    bring: {cajon: false, djembe: false, conga: false, cowbell: false, splash: false, windChime: false},
    other: null
  }
  isLineOutForAcousticGuitar = false
  acousticGuitar = {type: null, text: null} //type: "マイク", "ライン", "ライン&マイク"
  isRentedKeyboard = false
  rentKeyboard = {number: null}
  bringKeyboardLists = [] //{name: String, channel: (twoChannel), terminal: (terminal), isDi: Bool}
  isMicForInstrument = false
  isBroughtMicForInstrument = false
  micForInstrument = {type: null, brand: null, model: null} // type: (line)"
  isLineOut = false
  lineOutLists = [] //{name: String, channel: (twoChannel), terminal: (terminal), isDi: Bool}
  // isLineOutForViolin = false
  lineOutForViolin = {terminal: null, isDi: false} //terminal: (terminal), isDi: Bool
  isSync = false
  sync = {type: null, channel: null, terminal: null} //type: (sync), channel: (twoChannel), terminal: (terminal)
  isSyncForDrum = false
  syncForDrum = {type: null, channel: null, terminal: null, site: null} //type: (sync), channel: (twoChannel), terminal: (terminal), site: (site), 
  // isMonitor = false
  isBroughtMonitor = false
  monitor = {type: null, channel: null}//type: (line), channel: (twoChannel)
  isPower = false
  text = null


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
    this.isMicForInstrument = instrument.isMicForInstrument
    this.isBroughtMicForInstrument = instrument.isBroughtMicForInstrument
    this.micForInstrument = instrument.micForInstrument
    this.isLineOut = instrument.isLineOut
    this.lineOutLists = instrument.lineOutLists
    // this.isLineOutForViolin = instrument.isLineOutForViolin
    this.lineOutForViolin = instrument.lineOutForViolin
    this.isSync = instrument.isSync
    this.sync = instrument.sync
    this.isSyncForDrum = instrument.isSyncForDrum
    this.syncForDrum = instrument.syncForDrum
    // this.isMonitor = instrument.isMonitor
    this.isBroughtMonitor = instrument.isBroughtMonitor
    this.monitor = instrument.monitor
    this.isPower = instrument.isPower
    this.text = instrument.text
  }

}