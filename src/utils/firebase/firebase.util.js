import {initializeApp} from "firebase/app";
import {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import {getFirestore, doc, setDoc,getDoc, collection, writeBatch, getDocs, query} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAf7rJLYaMd9mymGaLMIQwt-2L9AikhEEU",
    authDomain: "crown-db-a8a8b.firebaseapp.com",
    databaseURL: "https://crown-db-a8a8b.firebaseio.com",
    projectId: "crown-db-a8a8b",
    storageBucket: "crown-db-a8a8b.appspot.com",
    messagingSenderId: "333949848005",
    appId: "1:333949848005:web:4858a2ca120a210108a3ac"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
console.log(firebaseApp);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("Done");

}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) =>{
        const {title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})

    return categoryMap;
}

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleDirect = () => signInWithRedirect(auth, googleProvider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async  (userAuth, additionalInformation ={}) => {
    if(!userAuth) return ;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot.exists());
    console.log(userSnapshot);

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try{
            await setDoc(userDocRef, {displayName, email, createAt, ...additionalInformation});
        }catch(err){
            console.log('error creating a user', err.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword =  async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword =  async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const userSignOut = async () => {
    return signOut(auth);
}

export const onAuthStateChangedListener = (callback) => {
    return onAuthStateChanged(auth, callback);
}