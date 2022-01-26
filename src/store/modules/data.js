export default{
  namespaced: true,
  state:{
    myMusicLists: [],
    exportSetList: null,

    band: null,

  },
  getters:{
    myMusicLists: state => state.myMusicLists,
    exportSetList: state => state.exportSetList,
    band: state => state.band,
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

  },
  actions:{

  },
}