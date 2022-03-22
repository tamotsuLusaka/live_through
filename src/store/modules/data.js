export default{
  namespaced: true,
  state:{
    myMusicLists: [],
    exportSetList: null,
    band: null,
    instrument: null,
    exportBand: null,
    exportIdol:null
  },
  getters:{
    myMusicLists: state => state.myMusicLists,
    exportSetList: state => state.exportSetList,
    band: state => state.band,
    instrument: state => state.instrument,
    exportBand: state => state.exportBand,
    exportIdol: state => state.exportIdol,
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
    setExportIdol(state, payload){
      state.exportIdol = payload
    },
  },
  actions:{

  },
}