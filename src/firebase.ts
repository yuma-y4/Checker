import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAzT4giSyK6Cxizj4aW_Ms6bYj68AQIiKM",
  authDomain: "checker-37776.firebaseapp.com",
  projectId: "checker-37776",
  storageBucket: "checker-37776.appspot.com",
  messagingSenderId: "294056893297",
  appId: "1:294056893297:web:91c5caf5f6e92e2360f4d0"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();
