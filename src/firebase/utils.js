import {initializeApp, getApps} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {initializeFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyASWCp7arimbwaLVanhGhZucNFWhVE-s10',
  authDomain: 'prayup-9efba.firebaseapp.com',
  projectId: 'prayup-9efba',
  storageBucket: 'prayup-9efba.appspot.com',
  messagingSenderId: '264882387609',
  appId: '1:264882387609:web:09755487db2ef1e68e1608',
  measurementId: 'G-P22FDQ6YQ8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const user = auth.currentUser;
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
const storage = getStorage();
const getapps = getApps();
export {auth, user, db, storage, getApps};
