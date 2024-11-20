import React, { useState } from 'react';
import useTasksStore from '../zustand/useTasksStore';
import useCategoriesStore from '../zustand/useCategoriesStore';
import useAuthStore from '../zustand/useAuthStore';
import { animated } from 'react-spring';
import EditTaskModal from './EditTaskModal';
import useModalStore from '../zustand/useModalStore';
import { useShallow } from 'zustand/shallow';

const Task = ({ task, style={} }) => {

  // State to manage the visibility of the task details
  const [detailsAreVisible, setDetailsAreVisible] = useState(false);

  // Toggles the visibility of task details.
  const changeDetailsVisibility = () => {
      setDetailsAreVisible(!detailsAreVisible);
  };

  // Retrieve the current user from the auth Zustand store
  const user = useAuthStore(state => state.user);

  // Retrieve the showModal function from the modal Zustand store
  const showModal = useModalStore(state => state.showModal);

  // Retrieve the categories from the categories Zustand store
  const categories = useCategoriesStore(state => state.categories);

  // Retrieve the deleteTask and changeIsCompleted functions from the tasks Zustand store
  const [deleteTask, changeIsCompleted] = useTasksStore(useShallow(state => [state.deleteTask, state.changeIsCompleted]));
  
  // Handle clicking on the delete task button
  const handleDelete = () => {

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
  const handleEdit = (task) => {
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
      // Else, "handle" errors that occured during the task deleting process
      .catch(error => {
          console.error(error);
      })
  }

  return (
    <li className='task' style={style}>
      <div className="task-header">
        <input className={"task-checkbox" + (task.isCompleted ? " completed" : "")} onChange={() => handleCheckChange(task)} type="checkbox" checked={task.isCompleted} />
        <h3 className="task-title">{task.title}</h3>
        {/* <div className={"task-state " + (task.isCompleted ? "completed" : "")}>{task.isCompleted ? "Complétée" : "En cours"}</div> */}
        <div className='task-owner'>{task.owner}</div>
        <div className='task-category-container'>
          <div className='task-category'>{categories.find(category => category.id === task.categoryId).name}</div>
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
      <div className={"task-details" + (detailsAreVisible ? " visible" : "") + (task.userId === user.uid ? " editable" : "")}>
        <p className="task-description">{task.description}</p>
        {(task.userId === user.uid) && (
          <div className="task-actions">
              <button onClick={handleEdit} className="task-action edit-task">Modifier</button>
              <button onClick={handleDelete} className="task-action delete-task">Supprimer</button>
          </div>
        )}
      </div>
    </li>
  );
}

export default Task;