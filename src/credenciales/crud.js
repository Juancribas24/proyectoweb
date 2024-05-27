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

export const readDocument = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map(doc => doc.data());
    console.log("Documents data:", data);
    return data;
  } catch (error) {
    console.error("Error reading documents:", error);
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