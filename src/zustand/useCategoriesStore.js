import { collection, onSnapshot } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase";

const useCategoriesStore = create((set) => ({
    categories: [],
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