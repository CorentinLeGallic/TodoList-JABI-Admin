import React, { useState } from 'react';
import useModalStore from '../zustand/useModalStore';
import useCategoriesStore from '../zustand/useCategoriesStore';
import FormModal from './FormModal';
import FormInputContainer from './FormInputContainer';

const EditCategoryModal = ({ category, style={} }) => {

  // Retrieve the hideModal function from the modal Zustand store
  const hideModal = useModalStore(state => state.hideModal);

  // Retrieve the editCategory function from the tasks Zustand store
  const editCategory = useCategoriesStore(state => state.editCategory);

  // Store all the new task's informations
  const [form, setForm] = useState({
    categoryName: category.name,
    categoryDescription: category.description,
  });

  // Store all the form input values errors
  const [errors, setErrors] = useState({
    categoryName: null,
    categoryDescription: null,
    global: null
  });

  // Handle the task adding form submit
  const handleFormSubmit = () => {

    // Initialize a new empty object that will contain all the form input values errors
    const newErrors = {
      categoryName: null,
      categoryDescription: null,
      global: null
    };

    // Reset the error object
    setErrors(newErrors);

    // Ensure the categoryName field is filled
    if(form.categoryName.length === 0){
        console.warn('categoryName field is empty');

        // Store the error in the newErrors object
        newErrors.categoryName = 'Ce champ est obligaroire.';

        // Add the new form input value error to the errors object and return
        setErrors(newErrors);
        return;
    }

    // Try to edit the category using the editCategory function
    editCategory(category.id, form.categoryName, form.categoryDescription)
      // If the category was edited successfully...
      .then(() => {
          // ...hide the modal
          hideModal();
      })
      // Else, handle errors that occured during the category editing process
      .catch(error => {
        console.error(error);

        // Store the error in the errors object
        setErrors({
          ...errors,
          global: "Une erreur est survenue, veuillez réessayer ultérieurement."
        });
      })
  }

  return (
    <FormModal label="Modifier une catégorie" handleSubmit={handleFormSubmit} errors={errors} style={style}>
        <FormInputContainer label='Nom' error={errors.taskTitle} className='task-form-input-container'>
            <input type="text" className="task-form-input task-form-text-input" value={form.categoryName} onChange={(e) => setForm({ ...form, categoryName: e.target.value})} />
        </FormInputContainer>
        <FormInputContainer label='Description' error={errors.taskDescription} className='task-form-input-container'>
            <textarea className="task-form-input task-form-textarea" value={form.categoryDescription} onChange={(e) => setForm({ ...form, categoryDescription: e.target.value})} rows={3} />
        </FormInputContainer>
    </FormModal>
  );
}

export default EditCategoryModal;