export default{
  namespaced: true,
  state:{
    isSignedIn: false,
    userId: null,
    userName: null,

  },
  getters:{
    isSignedIn: state => state.isSignedIn,
    userId: state => state.userId,
    userName: state => state.userName,
  },
  mutations:{
    setIsSignedIn(state, payload){
      state.isSignedIn = payload
    },
    setUserId(state, payload){
      state.userId = payload
    },
    setUserName(state, payload){
      state.userName = payload
    },

  },
  actions:{

  },
}