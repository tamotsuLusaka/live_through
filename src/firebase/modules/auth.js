import firebaseApp from '../index.js'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth"

import store from '@/store/index.js'

const auth = getAuth(firebaseApp)

export default {

  signUp(email, password){
    return createUserWithEmailAndPassword(auth, email, password)
  },
  signIn(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  },
  isSignedIn(){
    onAuthStateChanged(auth, (user)=>{
      if(user){
        store.commit('auth/setIsSignedIn', true)
        store.commit('auth/setUserId', user.uid)
      }else{
        store.commit('auth/setIsSignedIn', false)
        store.commit('auth/setUserId', null)
        store.commit('auth/setUserName', null)
      }
    })
  },
  signOut(){
    signOut(auth)
    .then(()=>{
      console.log("ログアウト成功")
    })
    .catch((error)=>{
      console.log(error.message)
      console.log("ログアウト失敗")
    })
  }

}