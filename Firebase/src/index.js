import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

// Get this code on the Config from Firebas Website
const firebaseConfig = {
    apiKey: "AIzaSyCHLP_B7U3snOg92JfZBta9LYbyYEhxGvQ",
    authDomain: "fir-9-begin-27905.firebaseapp.com",
    projectId: "fir-9-begin-27905",
    storageBucket: "fir-9-begin-27905.appspot.com",
    messagingSenderId: "191715586679",
    appId: "1:191715586679:web:859c5764af0be2fd96cc72"
  };

  
  // init firebase app
  initializeApp(firebaseConfig)

  // init services
  const db = getFirestore()
  const auth = getAuth()

  // collection ref
  const colRef = collection(db, 'books')

  // queries
//   const q = query(colRef, where("author", "==", "patrick rothfuss"), orderBy('title', 'desc'))
     const q = query(colRef, orderBy('createdAt'))

  // get collection data then 
  // real time collection data

  //   getDocs(colRef)
//     .then((snapshot) => {
//         console.log(snapshot.docs)
//         let books = []
//         snapshot.docs.forEach((doc) => {
//             books.push({ ...doc.data(), id: doc.id })
//         })
//         console.log(books)
//     })
//     .catch(() => {
//         console.log(err.message);
//     })

    // we want to run the query, just replace colRef to q

    const unsubCol = onSnapshot(q, (snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({ ...doc.data(), id: doc.id })
        })
        console.log(books)
    })

    // adding documents

    const addBookForm = document.querySelector('.add')
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault()
        
        addDoc(colRef, {
            title: addBookForm.title.value,
            author: addBookForm.author.value,
            createdAt: serverTimestamp()
        })
        .then(() => {
            addBookForm.reset()
        })

    })

    // deleting documents
    const deleteBookForm = document.querySelector('.delete')
    deleteBookForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const docRef = doc(db, 'books', deleteBookForm.id.value)

        deleteDoc(docRef)
            .then(() => {
                deleteBookForm.reset();
            })
    })


    // get a single document
    const docRef = doc(db, 'books', 'CadREstGFvIbNNQFcBW7')

    // Not realtime
    // getDoc(docRef)
    //     .then((doc) => {
    //         console.log(doc.data(), doc.id)
    //     })

    // Real Time
    const unsubDoc = onSnapshot(docRef, (doc) => {
        console.log(doc.data(), doc.id)
    })

    // updating a document
    const updateForm = document.querySelector('.update')
    updateForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const docRef = doc(db, 'books', updateForm.id.value)

        updateDoc(docRef, {
            title: 'updated title'
        })
        .then(() => {
            updateForm.reset()
        })
    })

    // signing users up
    const signupForm = document.querySelector('.signup')
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const email = signupForm.email.value
        const password = signupForm.password.value

        createUserWithEmailAndPassword(auth, email, password)
            .then((cred) => {
               // console.log('user created: ',cred.user)
                signupForm.reset()
            })
            .catch((err) => {
                console.log(err.message)
            })

    })


    // logging in and out 
    const logoutBtn = document.querySelector('.logout')
    logoutBtn.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
               // console.log('the user signed out')
            })
            .catch((err) => {
                console.log(err.message)
            })
    })

    const loginForm = document.querySelector('.login')
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const email = loginForm.email.value
        const password = loginForm.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then((cred) => {
                //console.log('the user logged in: ', cred.user)
            })
            .catch((err) =>{
                console.log(err.message)
            })

    })

    // subscribing to auth changes
    const unsubAuth = onAuthStateChanged(auth, (user) => {
        console.log('user status changed: ', user)
    })

    // unsubcribing from changes (auth & db)
    const unsubBtn = document.querySelector('.unsub')
    unsubBtn.addEventListener('click', () => {
        console.log('unsubscribing')
        unsubCol()
        unsubDoc()
        unsubAuth()
    })