// firebase-config.js
// Общий файл конфигурации Firebase для всех страниц

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    Timestamp,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Конфигурация Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCsZoVihjNlNnekag8KzK1B7_whmF4pkOo",
    authDomain: "building-store-66294.firebaseapp.com",
    projectId: "building-store-66294",
    storageBucket: "building-store-66294.firebasestorage.app",
    messagingSenderId: "192694380898",
    appId: "1:192694380898:web:51837f94629555d310e43b",
    measurementId: "G-ZD5DPH2HES"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Делаем глобально доступным для отладки и тестов
window.db = db;
window.auth = auth;
window.firebaseInitialized = true;

console.log("✅ Firebase инициализирован!");

// Экспортируем все необходимые функции и объекты
export {
    db,
    auth,
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy,
    Timestamp,
    setDoc,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
};