export default{
  namespaced: true,
  state:{
    myMusicLists: [],
    exportSetList: null,
    band: null,
    instrument: null,
    exportBand: null,
    idol: null,
    exportIdol:null,

    innerHeight:null,
  },
  getters:{
    myMusicLists: state => state.myMusicLists,
    exportSetList: state => state.exportSetList,
    band: state => state.band,
    instrument: state => state.instrument,
    exportBand: state => state.exportBand,
    idol: state => state.idol,
    exportIdol: state => state.exportIdol,
    innerHeight: state => state.innerHeight,
  },
  mutations:{
    setMyMusicLists(state, payload){
      state.myMusicLists = payload
    },
    setExportSetList(state, payload){
      state.exportSetList = payload
    },
    setBand(state, payload){
      state.band = payload
    },
    setInstrument(state, payload){
      state.instrument = payload
    },
    setExportBand(state, payload){
      state.exportBand = payload
    },
    setIdol(state, payload){
      state.idol = payload
    },
    setExportIdol(state, payload){
      state.exportIdol = payload
    },
    setInnerHeight(state, payload){
      state.innerHeight = payload
    },
  },
  actions:{

  },
}