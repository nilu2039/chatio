import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyBOEqIHosVMzeJ329P4H8mQnEgoo2iYorI",
    authDomain: "whatsapp-clone-9935c.firebaseapp.com",
    projectId: "whatsapp-clone-9935c",
    storageBucket: "whatsapp-clone-9935c.appspot.com",
    messagingSenderId: "809989369605",
    appId: "1:809989369605:web:e93d8f973fa98f44d4d16c",
    measurementId: "G-PZTJS12BX0"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;