import { initializeApp } from "firebase/app";
import firebaseConfig from "./config.js";
import { getFirestore, collection, addDoc, query, getDocs, deleteDoc, doc, setDoc } from "firebase/firestore";

initializeApp(firebaseConfig);

const db = getFirestore();

const col = "courses";
// Agregar datos

const addData = async(data, callback) => {
  try {
    const docRef = await addDoc(collection(db, col), data);
    console.log("Document written with ID: ", docRef.id);
    callback();
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Error adding document");
  }
};

// listar datos 
const listData = async (callback) => {
  const q = query(collection(db, col));
  try {
    const querySnapshot = await getDocs(q);
    let data = []
    querySnapshot.forEach((doc) => {
      data.push(
        {
          id: doc.id,
          data: doc.data()
        })
    });
    callback(data);
    console.log(data);
  } catch (e) {
    console.log("Error", e);
  }
};

// Borrar datos
const deleteData = async (id) => {
  try {
    await deleteDoc(doc(db, col, id));
    alert("Curso Borrado");
  } catch (e) {
    console.log("Error", e);
  }
};

// Actualizar datos

const updateData = async (id,data) => {
  try {
    console.log("DATA",id, data);
    await setDoc(doc(db, col, id), data);
    alert("Datos actualizados");
    
    // Agregar callback aca
  } catch (e) {
    console.log("Error", e);
    alert("Error agregando documento");
  }
};
export { addData, listData, deleteData, updateData };
