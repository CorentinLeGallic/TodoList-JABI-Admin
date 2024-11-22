import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase";

const useCategoriesStore = create((set) => ({
    categories: [],
    // Add a new category
    addCategory: (categoryName, categoryDescription) => {
        // Add a document to the categories collection and return the associated promise
        return addDoc(collection(db, "categories"), {
            name: categoryName,
            description: categoryDescription
        });
    },
    // Edit a category
    editCategory: (categoryId, categoryName, categoryDescription) => {
        // Update the category's document and return the associated promise
        return updateDoc(doc(db, "categories", categoryId), {
            name: categoryName,
            description: categoryDescription
        });
    },
    // Delete a category and all the associated tasks
    deleteCategory: async (categoryId) => {
        try {
            // Get the task documents that match the category's id
            const tasksQuery = query(collection(db, "tasks"), where("categoryId", "==", categoryId));
            const querySnapshot = await getDocs(tasksQuery);
    
            // Delete the found tasks and get the associated promise
            const tasksPromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    
            // Delete the category's document and get the associated promise
            const categoryPromise = deleteDoc(doc(db, "categories", categoryId));
    
            // Execute all deletions and return the associated merged promises
            return Promise.all([...tasksPromises, categoryPromise]);
        // If an error occured, return a rejected promise
        } catch (error) {
            return new Promise((resolve, reject) => reject(error));
        }
    },
    initializeCategories: () => {
        // Watch the categories collection and create an unsubscribe function
        const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
            // For each category...
            const categories = snapshot.docs.map((doc) => ({
                id: doc.id, // ...get the document ID
                ...doc.data(), // ...get the document's data
            }));

            // Update the current categories (and sort them by name)
            set({ categories: categories.toSorted((a, b) => {
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return -1;
                } else if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1;
                } else {
                    return 0;
                }
            })});
        });

        // Unsubscribe to the observer's watch on component unmount
        return unsubscribe;
    }
}));

export default useCategoriesStore;