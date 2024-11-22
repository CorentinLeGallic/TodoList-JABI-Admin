import React, { useState } from 'react';
import useTasksStore from '../zustand/useTasksStore';
import useCategoriesStore from '../zustand/useCategoriesStore';
import { animated } from 'react-spring';
import EditTaskModal from './EditTaskModal';
import useModalStore from '../zustand/useModalStore';
import { useShallow } from 'zustand/shallow';
import EditCategoryModal from './EditCategoryModal';

const Task = ({ task, style={} }) => {

  // State to manage the visibility of the task details
  const [detailsAreVisible, setDetailsAreVisible] = useState(false);

  // Toggles the visibility of task details.
  const changeDetailsVisibility = () => {
      setDetailsAreVisible(!detailsAreVisible);
  };

  // Retrieve the showModal function from the modal Zustand store
  const showModal = useModalStore(state => state.showModal);

  // Retrieve the categories from the categories Zustand store
  const [categories, deleteCategory] = useCategoriesStore(useShallow(state => [state.categories, state.deleteCategory]));

  // Retrieve the deleteTask and changeIsCompleted functions from the tasks Zustand store
  const [deleteTask, changeIsCompleted] = useTasksStore(useShallow(state => [state.deleteTask, state.changeIsCompleted]));
  
  // Handle clicking on the delete task button
  const handleTaskDelete = () => {

    // Try to delete the task using the deleteTask function
    deleteTask(task.id)
      // If the task was deleted successfully...
      .then(() => {
        // ...log it in the console
        console.log("Task successfully deleted");
      })
      // Else, "handle" errors that occured during the task deleting process
      .catch(error => {
          console.error(error);
      })
  }

  // Handle clicking on the edit task button
  const handleTaskEdit = () => {
    // Create an animated version of the EditTaskModal component using the react-spring animated function
    const AnimatedEditTaskModal = animated(EditTaskModal);

    // Show the EditTask modal
    showModal(<AnimatedEditTaskModal task={task} />)
  }

  // Handle change on the checkbox
  const handleCheckChange = (task) => {

    // Try to change the completion status of the task using the changeIsCompleted function
    changeIsCompleted(task.id, !task.isCompleted)
      // If the task was updated successfully...
      .then(() => {
        // ...log it in the console
        console.log("Task status successfully updated");
      })
      // Else, "handle" errors that occured during the task updating process
      .catch(error => {
          console.error(error);
      })
  }

  // Handle clicking on the edit category button
  const handleCategoryEdit = () => {
    // Create an animated version of the EditCategoryModal component using the react-spring animated function
    const AnimatedEditCategoryModal = animated(EditCategoryModal);

    // Get the category of the task
    const category = categories.find(category => category.id === task.categoryId);

    // If the category exists...
    if(category){
      // ...show the EditCategory modal
      showModal(<AnimatedEditCategoryModal category={category} />)
    }
  }

  // Handle clicking on the delete category button
  const handleCategoryDelete = () => {

    // Try to delete the category using the deleteCategory function
    deleteCategory(task.categoryId)
      // If the category was deleted successfully...
      .then(() => {
        // ...log it in the console
        console.log("Category and associated tasks successfully deleted");
      })
      // Else, "handle" errors that occured during the category deleting process
      .catch(error => {
          console.error(error);
      })
  }

  return (
    <li className='task' style={style}>
      <div className="task-header">
        <input className={"task-checkbox" + (task.isCompleted ? " completed" : "")} onChange={() => handleCheckChange(task)} type="checkbox" checked={task.isCompleted} />
        <div className='task-header-infos'>
          <h3 className="task-title">{task.title}</h3>
          <div className='task-owner'>{task.owner}</div>
          <div className={'task-category-container' + (task.isAdminTask ? " admin-task" : "")}>
            <div className={'task-category'}>{task.isAdminTask ? "Administration" : categories.find(category => category.id === task.categoryId)?.name}</div>
            {!task.isAdminTask && (
              <div className='category-actions-container'>
                <button className='category-action-button category-edit' onClick={handleCategoryEdit}>
                  <svg className='category-action-icon' fill="#000000" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlnsXlink="http://www.w3.org/1999/xlink" enableBackground="new 0 0 512 512">
                    <g>
                      <g>
                        <path d="m455.1,137.9l-32.4,32.4-81-81.1 32.4-32.4c6.6-6.6 18.1-6.6 24.7,0l56.3,56.4c6.8,6.8 6.8,17.9 0,24.7zm-270.7,271l-81-81.1 209.4-209.7 81,81.1-209.4,209.7zm-99.7-42l60.6,60.7-84.4,23.8 23.8-84.5zm399.3-282.6l-56.3-56.4c-11-11-50.7-31.8-82.4,0l-285.3,285.5c-2.5,2.5-4.3,5.5-5.2,8.9l-43,153.1c-2,7.1 0.1,14.7 5.2,20 5.2,5.3 15.6,6.2 20,5.2l153-43.1c3.4-0.9 6.4-2.7 8.9-5.2l285.1-285.5c22.7-22.7 22.7-59.7 0-82.5z"/>
                      </g>
                    </g>
                  </svg>
                </button>
                <button className='category-action-button category-delete' onClick={handleCategoryDelete}>
                  <svg className='category-action-icon' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24">
                    <path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        <button className="task-reveal" onClick={changeDetailsVisibility}>
          <svg className={"task-reveal-icon" + (detailsAreVisible ? " active" : "")} xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24">
              <rect x="0" fill="none" width="24" height="24" />
              <g>
                  <path d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586" />
              </g>
          </svg>
        </button>
      </div>
      <div className={"task-details" + (detailsAreVisible ? " visible" : "")}>
        <p className="task-description">{task.description}</p>
          <div className="task-actions">
              <button onClick={handleTaskEdit} className="task-action edit-task">Modifier</button>
              <button onClick={handleTaskDelete} className="task-action delete-task">Supprimer</button>
          </div>
      </div>
    </li>
  );
}

export default Task;