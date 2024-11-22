import { useEffect } from 'react';
import useAuthStore from '../zustand/useAuthStore';
import useTasksStore from '../zustand/useTasksStore';
import useCategoriesStore from '../zustand/useCategoriesStore';
import useUsersStore from '../zustand/useUsersStore';

// Initialize all the Firestore Database observers that update the Zustand stores values in real time
const DatabaseInitializer = ({ children }) => {

    const user = useAuthStore(state => state.user);

    // Retrieve all the observers initializers functions from their Zustand stores
    const initializeAuth = useAuthStore(state => state.initializeAuth);
    const initializeUserAccess = useAuthStore(state => state.initializeUserAccess);
    const initializeUsers = useUsersStore(state => state.initializeUsers);
    const initializeTasks = useTasksStore(state => state.initializeTasks);
    const initializeCategories = useCategoriesStore(state => state.initializeCategories);

    // Watch the auth updates
    useEffect(() => {
        const unsubscribe = initializeAuth();
        return () => unsubscribe();
    }, [initializeAuth]);

    // Watch the user's access updates
    useEffect(() => {
        if(user){
            const unsubscribe = initializeUserAccess(user.uid);
            return () => unsubscribe();
        }
    }, [initializeUserAccess, user]);

    // Watch the users updates
    useEffect(() => {
        if(user){
            const unsubscribe = initializeUsers();
            return () => unsubscribe();
        }
    }, [initializeUsers, user]);

    // Watch the categories updates
    useEffect(() => {
        if(user){
            const unsubscribe = initializeCategories();
            return () => unsubscribe();
        }
    }, [initializeCategories, user]);

    // Watch the tasks updates
    useEffect(() => {
        if(user){
            const unsubscribe = initializeTasks();
            return () => unsubscribe();
        }
    }, [initializeTasks, user]);

    return children;
}

export default DatabaseInitializer;