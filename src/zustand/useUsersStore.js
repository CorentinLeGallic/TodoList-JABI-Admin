import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase";
import { combine } from "zustand/middleware";

const useUsersStore = create(
    combine({ users: [] }, (set) => {
        return {
            // Promote an user to admin
            promoteUser: (userId) => {
                // Update the user's document and return the associated promise
                return updateDoc(doc(db, "users", userId), {
                    isAdmin: true
                })
            },
            initializeUsers: () => {
                // Watch the users collection and create an unsubscribe function
                const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
                    // For each user...
                    const users = snapshot.docs.map((doc) => ({
                        id: doc.id, // ..get the document ID
                        ...doc.data(), // ..get the document's data
                    }));

                    // Update the current users
                    set({ users: users });
                });
        
                // Unsubscribe to the observer's watch on component unmount
                return unsubscribe;
            }
        }
    })
);

export default useUsersStore;