import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../firebase";
import { combine } from "zustand/middleware";
import useAuthStore from './useAuthStore';
import useCategoriesStore from "./useCategoriesStore";
import useUsersStore from "./useUsersStore";

const useTasksStore = create(
    combine({ tasks: [] }, (set) => {
        return {
            // Change the completion status of a task
            changeIsCompleted: (taskId, newIsCompleted) => {
                // Update the task's document and return the associated promise
                return updateDoc(doc(db, "tasks", taskId), {
                    isCompleted: newIsCompleted
                })
            },
            // Add a new task
            addTask: (title, description, isAdminTask, categoryId) => {
                // Add a document to the tasks collection and return the associated promise
                return addDoc(collection(db, "tasks"), {
                    title: title,
                    description: description,
                    isAdminTask: isAdminTask,
                    categoryId: categoryId,
                    isCompleted: false,
                    userId: useAuthStore.getState().user.uid
                });
            },
            // Edit a task
            editTask: (taskId, title, description, categoryId=null) => {
                // Update the task's document and return the associated promise
                return updateDoc(doc(db, "tasks", taskId), {
                    title: title,
                    description: description,
                    ...(categoryId && { categoryId: categoryId })
                });
            },
            // Delete a task
            deleteTask: (taskId) => {
                // Delete the task's document and return the associated promise
                return deleteDoc(doc(db, "tasks", taskId));
            },
            initializeTasks: () => {
                // Watch the tasks collection and create an unsubscribe function
                const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
                    // For each task...
                    const tasks = snapshot.docs.map((doc) => ({
                            id: doc.id, // ...get the document ID
                            owner: useUsersStore.getState().users.find(user => user.id === doc.data().userId)?.username, // ...get the task owner's username
                            categoryName: useCategoriesStore.getState().categories.find(category => category.id === doc.data().categoryId)?.name, // ...get the task category's name
                            ...doc.data(), // ...get the document's data
                    }));
                
                    // Update the current tasks
                    set({ tasks: tasks });
                });
        
                // Unsubscribe to the observer's watch on component unmount
                return unsubscribe;
            },
        }
    })
);

export default useTasksStore;