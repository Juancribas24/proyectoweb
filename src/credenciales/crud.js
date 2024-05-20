import { db } from '../credenciales/credenciales';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const createDocument = async (collection, id, data) => {
    try {
      await setDoc(doc(db, collection, id), data);
      console.log("Document created with ID:", id);
    } catch (error) {
      console.error("Error creating document:", error);
    }
};

export const readDocument = async (collection, id) => {
    try {
      const docRef = doc(db, collection, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data();
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error reading document:", error);
    }
};

export const updateDocument = async (collection, id, data) => {
    try {
      const docRef = doc(db, collection, id);
      await updateDoc(docRef, data);
      console.log("Document updated with ID:", id);
    } catch (error) {
      console.error("Error updating document:", error);
    }
};
  
  // Delete a document
  export const deleteDocument = async (collection, id) => {
    try {
      const docRef = doc(db, collection, id);
      await deleteDoc(docRef);
      console.log("Document deleted with ID:", id);
    } catch (error) {
      console.error("Error deleting document:", error);
    }
};