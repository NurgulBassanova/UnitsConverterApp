import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA9PQDoiFu95qMoRx8qtYSVLLW67sAf4Q4",
  authDomain: "unitsconverter-feb0e.firebaseapp.com",
  projectId: "unitsconverter-feb0e",
  storageBucket: "unitsconverter-feb0e.appspot.com",
  messagingSenderId: "1060375850448",
  appId: "1:1060375850448:web:c77da9d0aa1c54ecd29dd5",
  measurementId: "G-VJRNZT6BTH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let analytics;

if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { auth, db, analytics };