import { useEffect } from 'react';
import useAuthStore from '../zustand/useAuthStore';
import useTasksStore from '../zustand/useTasksStore';
import useCategoriesStore from '../zustand/useCategoriesStore';
import { useShallow } from 'zustand/shallow';

// Initialize all the Firestore Database observers that update the Zustand stores values in real time
const DatabaseInitializer = ({ children }) => {

    // Retrieve all the observers initializers functions from their Zustand stores
    const initializeAuth = useAuthStore(state => state.initializeAuth);
    const [initializeTasks, initializeUsers] = useTasksStore(useShallow(state => [state.initializeTasks, state.initializeUsers]));
    const initializeCategories = useCategoriesStore(state => state.initializeCategories);

    // Watch the auth updates
    useEffect(() => {
        const unsubscribe = initializeAuth();
        return () => unsubscribe();
    }, [initializeAuth]);

    // Watch the users updates
    useEffect(() => {
        const unsubscribe = initializeUsers();
        return () => unsubscribe();
    }, [initializeUsers]);

    // Watch the categories updates
    useEffect(() => {
        const unsubscribe = initializeCategories();
        return () => unsubscribe();
    }, [initializeCategories]);

    // Watch the tasks updates
    useEffect(() => {
        const unsubscribe = initializeTasks();
        return () => unsubscribe();
    }, [initializeTasks]);

    return children;
}

export default DatabaseInitializer;