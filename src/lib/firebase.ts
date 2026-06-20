import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhS6dFskSN-A05pUV9Nli9mA73QrMqqEI",
  authDomain: "nexcentauri-pos-activations.firebaseapp.com",
  projectId: "nexcentauri-pos-activations",
  storageBucket: "nexcentauri-pos-activations.firebasestorage.app",
  messagingSenderId: "118250268829",
  appId: "1:118250268829:web:de7897b0ca62aac0f74c74"
};

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
