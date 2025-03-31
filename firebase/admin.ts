import {cert, getApps, initializeApp} from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

console.log("hii");

const initFirebaseAdmin = ()=>{
    const apps = getApps();
   console.log("the app is ", apps);

    if(!apps.length){
        initializeApp({
            credential: cert({
                projectId : process.env.FIREBASE_PROJECT_ID,
                clientEmail :process.env.FIREBASE_CLIENT_EMAIL,
                privateKey:process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g,"\n")
            })
        })
    }
return {
    auth:getAuth(),
    db: getFirestore()
}

}

export const{auth , db} = initFirebaseAdmin();