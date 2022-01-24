export default{
  namespaced: true,
  state:{
    myMusicLists: [],
    exportSetList: null

  },
  getters:{
    myMusicLists: state => state.myMusicLists,
    exportSetList: state => state.exportSetList,
  },
  mutations:{
    setMyMusicLists(state, payload){
      state.myMusicLists = payload
    },
    setExportSetList(state, payload){
      state.exportSetList = payload
    },

  },
  actions:{

  },
}