
import { db } from "./Firebase";
import { doc, getDoc, } from "firebase/firestore";
import React,{useContext} from "react";
import { AuthContext } from "./src/context/AuthContext";

export async function getInfo(){
    const docRef = doc(db, "Contents", "059M1AF4FMUBj1zk55Mg");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    }

   

}


export async function getUser(){
    const currentUser = useContext(AuthContext)
    const userRef = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        return userSnap.data()
    }

}

