export default{
  namespaced: true,
  state:{
    myMusicLists: [],
    exportSetList: null,
    band: null,
    instrument: null,
  },
  getters:{
    myMusicLists: state => state.myMusicLists,
    exportSetList: state => state.exportSetList,
    band: state => state.band,
    instrument: state => state.instrument,
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
  },
  actions:{

  },
}