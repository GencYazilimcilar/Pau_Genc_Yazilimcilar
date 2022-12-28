// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword,updateCurrentUser} from "firebase/auth";
import alertify from 'alertifyjs';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig ={
    apiKey: `${process.env.REACT_APP_firebase_api}`,
    authDomain:`${process.env.REACT_APP_authDomain}`,
    databaseURL: `https://${process.env.REACT_APP_databaseURL}.firebaseio.com`,
    projectId: `${process.env.REACT_APP_projectId}`,
    storageBucket: `${process.env.REACT_APP_storageBucket}`,
    messagingSenderId: `${process.env.REACT_APP_messagingSenderId}`,
    appId: `${process.env.REACT_APP_appId}`,
    measurementId:`${process.env.REACT_APP_measurementId}`
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getDatabase(app);
export const auth=getAuth(app);
export const logIn=async(email,password)=>{
    try{
       await signInWithEmailAndPassword(auth,email,password);
    }catch(e){
        alertify.error(e.message);
        console.log(e);
    }
}
export const logOut=async()=>{
    signOut(auth);
}
export const createUsers=async(email,password,userName,select)=>{
    try{
        await createUserWithEmailAndPassword(auth,email,password).then((user)=>{
            alert("Şu anda "+email+ " hesabındasınız!!!!");
            (userName!==null && userName!== undefined)&&updateCurrentUser(auth,{displayName:userName});
            alert(auth.currentUser.displayName);
            alert("Db den "+auth.currentUser.uid+" id li kişiyi "+select+"numaralı admin olarak eklemeyi unutmayınız.");
            alert("Çıkış yapıp kendi hesabınıza yeniden giriniz...");
        });
    }catch(e){
        alertify.error(e.message);
        console.log(e.message)
    }
}
