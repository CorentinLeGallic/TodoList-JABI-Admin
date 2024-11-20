import React, { useState } from 'react';
import FormModal from './FormModal';
import useModalStore from '../zustand/useModalStore';
import useCategoriesStore from '../zustand/useCategoriesStore';
import useTasksStore from '../zustand/useTasksStore';
import FormInputContainer from './FormInputContainer';

const EditTaskModal = ({ task, style={} }) => {

    // Retrieve the hideModal function from the modal Zustand store
    const hideModal = useModalStore(state => state.hideModal);

    // Retrieve the categories from the categories Zustand store
    const categories = useCategoriesStore(state => state.categories);

    // Retrieve the editTask function from the tasks Zustand store
    const editTask = useTasksStore(state => state.editTask);

    // Store all the edited task's informations
    const [form, setForm] = useState({
        taskTitle: task.title,
        taskDescription: task.description,
        categoryId: task.categoryId
    });

    // Store all the form input values errors
    const [errors, setErrors] = useState({
        taskTitle: null,
        taskDescription: null,
        categoryId: null,
        global: null
    });

    // Handle the task editing form submit
    const handleformSubmit = () => {

        // Initialize a new empty array that will contain all the form input values errors
        const newErrors = {
            taskTitle: null,
            taskDescription: null,
            categoryId: null,
            global: null
        };
    
        // Reset the error object
        setErrors(newErrors);
    
        // Ensure all form input fields are filled
        Object.entries(form).forEach(entry =>  {
            const [key, value] = entry;
            if(value.length === 0){
                console.warn(key + ' field is empty');
        
                // Store the error in the newErrors objec
                newErrors[key] = 'Ce champ est obligaroire.';
            }
        })
    
        // Ensure the given category exists
        if(!categories.find(category => category.id === form.categoryId)){
            console.warn('Given category does not exist');
        
            // Store the error in the newErrors object
            newErrors.categoryId = "Cette catégorie n'est pas valide.";
        }
    
        // If there is at least one error, add the new form input value errors to the errors object and return
        if(Object.values(newErrors).some(value => value)){
            console.log('Got an error before task edit attempt');
            setErrors(newErrors);
            return;
        }
        
        // Try to edit the task using the editTask function
        editTask(task.id, form.taskTitle, form.taskDescription, form.categoryId)
            // If the task was added successfully...
            .then(() => {
                // ...hide the modal
                hideModal();
            })
            // Else, handle errors that occured during the task adding process
            .catch(error => {
                console.error(error);

                // Store the error in the newErrors object
                setErrors({
                    ...errors,
                    global: "Une erreur est survenue, veuillez réessayer ultérieurement."
                });
            })
    }

    return (
        <FormModal label="Modifier une tâche" handleSubmit={handleformSubmit} errors={errors} style={style}>
            <FormInputContainer label='Nom' error={errors.taskTitle} className='task-form-input-container'>
                <input type="text" className="task-form-input task-form-text-input" value={form.taskTitle} onChange={(e) => setForm({ ...form, taskTitle: e.target.value})} />
            </FormInputContainer>
            <FormInputContainer label='Description' error={errors.taskDescription} className='task-form-input-container'>
                <textarea className="task-form-input task-form-textarea" value={form.taskDescription} onChange={(e) => setForm({ ...form, taskDescription: e.target.value})} rows={3} />
            </FormInputContainer>
            <FormInputContainer label='Catégorie' error={errors.categoryId} className='task-form-input-container'>
                <select className='task-form-select' value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value})}>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name + (category.description ? " - " + category.description : "")}</option>
                    ))}
                </select>
            </FormInputContainer>
        </FormModal>
    );
}

export default EditTaskModal;