import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyCS6COv7Xbi1E5MHug8WTzj5sTiKtxbAC0",
    authDomain: "emely-webapp.firebaseapp.com",
    projectId: "emely-webapp",
    storageBucket: "emely-webapp.appspot.com",
    messagingSenderId: "187345564821",
    appId: "1:187345564821:web:41898958f8ad51fab6d79c",
    measurementId: "G-0634RCW6CN" 
})

export const auth = app.auth()
export default app