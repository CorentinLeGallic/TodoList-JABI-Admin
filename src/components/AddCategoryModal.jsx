import React, { useState } from 'react';
import useModalStore from '../zustand/useModalStore';
import useCategoriesStore from '../zustand/useCategoriesStore';
import FormModal from './FormModal';
import FormInputContainer from './FormInputContainer';

const AddCategoryModal = ({ style={} }) => {

  // Retrieve the hideModal function from the modal Zustand store
  const hideModal = useModalStore(state => state.hideModal);

  // Retrieve the addCategory function from the tasks Zustand store
  const addCategory = useCategoriesStore(state => state.addCategory);

  // Store all the new category's informations
  const [form, setForm] = useState({
    categoryName: "",
    categoryDescription: "",
  });

  // Store all the form input values errors
  const [errors, setErrors] = useState({
    categoryName: null,
    categoryDescription: null,
    global: null
  });

  // Handle the category adding form submit
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

    // Try to add the category using the addCategory function
    addCategory(form.categoryName, form.categoryDescription)
      // If the category was added successfully...
      .then(() => {
          // ...hide the modal
          hideModal();
      })
      // Else, handle errors that occured during the category adding process
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
    <FormModal label="Ajouter une catégorie" handleSubmit={handleFormSubmit} errors={errors} style={style}>
        <FormInputContainer label='Nom' error={errors.categoryName} className='task-form-input-container'>
            <input type="text" className="task-form-input task-form-text-input" value={form.categoryName} onChange={(e) => setForm({ ...form, categoryName: e.target.value})} />
        </FormInputContainer>
        <FormInputContainer label='Description' error={errors.categoryDescription} className='task-form-input-container'>
            <textarea className="task-form-input task-form-textarea" value={form.categoryDescription} onChange={(e) => setForm({ ...form, categoryDescription: e.target.value})} rows={3} />
        </FormInputContainer>
    </FormModal>
  );
}

export default AddCategoryModal;