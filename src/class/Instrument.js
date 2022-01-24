export default class Instrument{

  id = null
  type = null 
  member = null
  position = {x: 0, y: 0}
  isVocal = false
  vocal = {part: null} //"ボーカル", "コーラス", "MC"
  isBroughtMic = false
  mic = {type: null, brand: null, model: null} // type: (line)
  isAmp = false
  amp = {type: null, brandOfHead: null, brandOfCabinet: null, brandOfCombo: null, position:{x: 0, y: 0}} // type: "rent", "head", "cabinet", "combo"
  idBroughtDi = false
  di = {brand: null, model: null}
  isDrum = false
  drum = {
    rent: {bass: false, snare: false, hiHat: false, floorTom: false, tom13: false, tom12: false, rideCymbal: false, crash18: false, crash16: false, kickPedal: false},
    bring: null
  }
  isPercussion = false
  percussion = {
    bring: {cajon: false, djembe: false, conga: false, cowbell: false, splash: false, windChime: false},
    other: null
  }
  isAcousticGuitar = false
  acousticGuitar = {type: null, text: null} //type: "マイク", "ライン", "ライン&マイク"
  isRentedKeyboard = false
  rentKeyboard = {number: null}
  bringKeyboardLists = [] //{name: String, channel: (twoChannel), terminal: (terminal), isDi: Bool}
  isMicForInstrument = false
  isBroughtMicForInstrument = false
  micForInstrument = {type: null, brand: null, model: null} // type: (line)"
  isLineOut = false
  lineOutLists = [] //{name: String, channel: (twoChannel), terminal: (terminal), isDi: Bool}
  isLineOutForViolin = false
  lineOutForViolin = {terminal: null, isDi: false} //terminal: (terminal), isDi: Bool
  isSync = false
  sync = {channel: null, terminal: null} //channel: (twoChannel), terminal: (terminal)
  isSyncForDrum = false
  syncForDrum = {channel: null, terminal: null, site: null} //channel: (twoChannel), terminal: (terminal), site: (site), 
  isMonitor = false
  isBroughtMonitor = false
  monitor = {type: null, channel: null}//type: (line), channel: (twoChannel)
  text = null

  constructor(instrument){
    if(instrument == null){return}
    this.id = instrument.id
  }

}