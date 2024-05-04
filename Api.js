
import { db } from "./Firebase";
import { doc, getDoc, } from "firebase/firestore";

export async function getInfo(){
    const docRef = doc(db, "Contents", "059M1AF4FMUBj1zk55Mg");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    }

   

}

