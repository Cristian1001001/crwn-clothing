import firebase from "firebase/app";

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAVSj2eI3KpHfmoU6suF7M9c-Mc35p3uNc",
    authDomain: "crwn-db-ddd4f.firebaseapp.com",
    databaseURL: "https://crwn-db-ddd4f.firebaseio.com",
    projectId: "crwn-db-ddd4f",
    storageBucket: "crwn-db-ddd4f.appspot.com",
    messagingSenderId: "702319632487",
    appId: "1:702319632487:web:b38c25c4f4fbeee01ef4c2",
    measurementId: "G-55DPGZXKV6"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const  userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email}= userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData

            })
        } catch (error){
            console.log('error creating user')
        }
    }
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
