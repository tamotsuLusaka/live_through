import firebaseApp from '../index.js'
import {
  getFirestore,
  serverTimestamp,
  doc,
  collection,
  setDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,

} from "firebase/firestore"
import router from '@/router/index.js'


const db = getFirestore(firebaseApp)

export default {

  createUser(user){
    user.createdAt = serverTimestamp()
    user.updatedAt = serverTimestamp()
    return setDoc(doc(db, "user", user.id),{...user})
  },
  getUser(userId){
    const docRef = doc(db, "user", userId)
    return getDoc(docRef)
  },
  async createMusic(music){
    music.createdAt = serverTimestamp()
    music.updatedAt = serverTimestamp()
    const musicRef = doc(collection(db, "music"))
    music.id = await musicRef.id
    return setDoc(musicRef,{...music})
  },
  getMusics(userId){
    const q = query(collection(db, "music"), where("userId", "==", userId))
    return getDocs(q)
  },
  getMusic(id){
    const docRef = doc(db, "music", id)
    return getDoc(docRef)
  },
  deleteMusic(id){
    const docRef = doc(db, 'music', id)
    return deleteDoc(docRef)
  },
  editMusic(music){
    music.updatedAt = serverTimestamp()
    const docRef = doc(db, 'music', music.id)
    return updateDoc(docRef, {...music})
  },
  async createSetList(setList){
    setList.createdAt = serverTimestamp()
    setList.updatedAt = serverTimestamp()
    const setListRef = doc(collection(db, "setList"))
    setList.id = await setListRef.id
    return setDoc(setListRef,{...setList})
  },
  editSetList(setList){
    setList.updatedAt = serverTimestamp()
    const docRef = doc(db, 'setList', setList.id)
    return updateDoc(docRef, {...setList})
  },
  getSetLists(userId){
    const q = query(collection(db, "setList"), where("userId", "==", userId))
    return getDocs(q)
  },
  getSetList(id){
    const docRef = doc(db, "setList", id)
    return getDoc(docRef)
  },
  deleteSetList(id){
    const docRef = doc(db, 'setList', id)
    return deleteDoc(docRef)
  },
  async createBand(band){
    band.createdAt = serverTimestamp()
    band.updatedAt = serverTimestamp()
    const bandRef = doc(collection(db, "band"))
    band.id = await bandRef.id
    return  setDoc(bandRef,{...band})
    .then(()=>{
      router.push({name: 'EditBand', params:{id: band.id}})
    })
  },
  editBand(band){
    band.updatedAt = serverTimestamp()
    const docRef = doc(db, 'band', band.id)
    return updateDoc(docRef, {...band})
  },
  getBand(id){
    const docRef = doc(db, "band", id)
    return getDoc(docRef)
  },
  getBands(userId){
    const q = query(collection(db, "band"), where("userId", "==", userId))
    return getDocs(q)
  },
  deleteBand(id){
    const docRef = doc(db, 'band', id)
    return deleteDoc(docRef)
  },
}