import {defineStore} from  "pinia"
import {auth} from "../js/firebase"
import { signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged} from "firebase/auth" 
import {ref} from "vue"
import {useRouter} from "vue-router"
import { useNotesStore } from "./NotesStore"
export const useAuthStore = defineStore('authStore',()=>{
  const user = ref({})
  const router = useRouter()
  const notesStore = useNotesStore()
   const init =()=>{
   onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
        const uid = userDetails.uid;
        user.value = { email:userDetails.email,uid}
        router.push({name:'notes'})
        notesStore.getNotes()
      
      } else { 
         user.value={}
         router.replace({name:'auth'})
         notesStore.clearNotes()
       
      }
    });
 }
 
 
   const registerUser= (credentails)=>{
   createUserWithEmailAndPassword(auth, credentails.email, credentails.password)
   .then((userCredential) => {
     // Signed in 
     const user = userCredential.user;
     console.log(user);
     // ...
   })
   .catch((error) => {
     console.log(error.message);
      //   const errorCode = error.code;
   //   const errorMessage = error.message;
     // ..
   });
 }


 const LoginUser =(credentails)=>{
   signInWithEmailAndPassword(auth, credentails.email, credentails.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    console.log(error.message);
   //  const errorCode = error.code;
   //  const errorMessage = error.message;
  });
 }

 const LogoutUser =()=>{
signOut(auth).then(() => {
  console.log("loggedout");
}).catch((error) => {
  // An error happened.
});
 }
 return{
    registerUser,
    LoginUser,
    LogoutUser,
    init,
    user
 }
})
   