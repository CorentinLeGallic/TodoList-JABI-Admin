import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { create } from "zustand";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { combine } from "zustand/middleware";

const useAuthStore = create(
    combine({ user: null, isLoading: true }, (set) => {
        return {
            // Log in the user
            loginUser: async (email, password) => {
                // Send a login request using Firebase Authentification and return the associated promise
                return signInWithEmailAndPassword(auth, email, password);
            },
            // Log out the user
            logOut: async () => {
                // Sign out the user using Firebase Authentification and return the associated promise
                return signOut(auth);
            },
            initializeAuth: () => {
                // Watch the user authentification's status and create an unsubscribe function
                const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

                    // Update the currently connected user
                    set({ user: currentUser, isLoading: false });
                });

                // Unsubscribe to the observer's watch on component unmount
                return unsubscribe;
            },
            initializeUserAccess: (currentUser) => {
                // Watch the user's access and create an unsubscribe function
                const unsubscribe = onSnapshot(doc(db, "users", currentUser), (snapshot) => {
                    if(!snapshot.data().isAdmin){
                        useAuthStore.getState().logOut();
                    }
                });
        
                // Unsubscribe to the observer's watch on component unmount
                return unsubscribe;
            }
        }
    })
);

export default useAuthStore;