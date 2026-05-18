// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ИСПРАВЛЕННАЯ КОНФИГУРАЦИЯ (используем ту же, что и в index.html)
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

// Делаем функции доступными глобально
window.db = db;
window.dbCollection = collection;
window.dbAddDoc = addDoc;
window.dbGetDocs = getDocs;
window.dbGetDoc = getDoc;
window.dbDoc = doc;
window.dbUpdateDoc = updateDoc;
window.dbDeleteDoc = deleteDoc;
window.dbQuery = query;
window.dbWhere = where;
window.dbOrderBy = orderBy;
window.dbTimestamp = Timestamp;

console.log("✅ Firebase Firestore подключен!");

// Функция для сохранения заказа в Firestore
window.saveOrderToFirestore = async function (orderData) {
    try {
        const ordersCollection = collection(db, "orders");
        const docRef = await addDoc(ordersCollection, {
            ...orderData,
            createdAt: Timestamp.now(),
            status: orderData.status || "новый"
        });
        console.log("✅ Заказ сохранен в Firestore с ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("❌ Ошибка сохранения заказа:", error);
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        return null;
    }
};

// Функция для получения всех заказов из Firestore
window.getAllOrdersFromFirestore = async function () {
    try {
        const ordersCollection = collection(db, "orders");
        const q = query(ordersCollection, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const orders = [];
        snapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });
        return orders;
    } catch (error) {
        console.error("❌ Ошибка загрузки заказов:", error);
        return JSON.parse(localStorage.getItem('orders')) || [];
    }
};

// Функция для обновления статуса заказа
window.updateOrderStatusInFirestore = async function (orderId, newStatus) {
    try {
        const orderRef = doc(db, "orders", orderId);
        await updateDoc(orderRef, {
            status: newStatus,
            updatedAt: Timestamp.now()
        });
        console.log("✅ Статус заказа обновлен");
        return true;
    } catch (error) {
        console.error("❌ Ошибка обновления статуса:", error);
        return false;
    }
};

// Функция для получения заказов пользователя
window.getUserOrdersFromFirestore = async function (userId) {
    try {
        const ordersCollection = collection(db, "orders");
        const q = query(ordersCollection, where("userId", "==", userId), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const orders = [];
        snapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });
        return orders;
    } catch (error) {
        console.error("❌ Ошибка загрузки заказов пользователя:", error);
        return [];
    }
};