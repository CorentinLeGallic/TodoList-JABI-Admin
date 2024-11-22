import React, { Fragment, useEffect, useState } from 'react';
import Task from './Task';
import useTasksStore from '../zustand/useTasksStore';
import useModalStore from '../zustand/useModalStore';
import { animated, useTransition } from 'react-spring';
import AccentButton from './AccentButton';
import AddTaskModal from './AddTaskModal';
import TasklistHeaderElement from './TasklistHeaderElement';
import useCategoriesStore from '../zustand/useCategoriesStore';
import useWindowSize from '../hooks/useWindowSize';
import AddCategoryModal from './AddCategoryModal';

const TaskManager = () => {

  // Retrieve the tasks from the tasks Zustand store
  const tasks = useTasksStore((state) => state.tasks);

  // Retrieve the categories from the categories Zustand store
  const categories = useCategoriesStore(state => state.categories);

  // Retrieve the showModal function from the modal Zustand store
  const showModal = useModalStore(state => state.showModal);

  // State to store the current tasks sorting criteria
  const [sortBy, setSortBy] = useState(null);

  // State to store the tasks sorted depending on the sortBy value
  const [sortedTasks, setSortedTasks] = useState(tasks);

  // State to store the current search bar value
  const [searchValue, setSearchValue] = useState("");

  // Retrieve the screen width from the useWindowSize hook
  const { width } = useWindowSize();

  // Update the sortedTasks when the sortBy value changes
  useEffect(() => {
    // If there's no sorting criteria, set the sortedTasks value to the tasks value and return
    if(!sortBy) {
      setSortedTasks(tasks);
      return;
    }

    // If the sorting criteria is the category name, handle the presence of admin tasks
    if(sortBy === "categoryName") {
      setSortedTasks(tasks.toSorted((a, b) => {
        if(a.isAdminTask && b.isAdminTask) {
          return 0;
        }
        if(a.isAdminTask) {
          return -1;
        }
        if(b.isAdminTask) {
          return 1;
        }
        
        if(a.categoryName.toLowerCase() < b.categoryName.toLowerCase()){
            return -1;
        } else if(a.categoryName.toLowerCase() > b.categoryName.toLowerCase()){
            return 1;
        } else {
            return 0;
        }
      }))
      return;
    }

    // Else, sort correctly the sortedTasks value
    setSortedTasks(tasks.toSorted((a, b) => {      
      if(a[sortBy].toLowerCase() < b[sortBy].toLowerCase()){
          return -1;
      } else if(a[sortBy].toLowerCase() > b[sortBy].toLowerCase()){
          return 1;
      } else {
          return 0;
      }
    }))
  }, [sortBy, setSortedTasks, categories, tasks])

  // Set up transitions for animating task elements using react-spring
  const tasksTransitions = useTransition(sortedTasks, {
    from: { maxHeight: 135 },
    enter: { maxHeight: 135 },
    leave: { maxHeight: 0 },
    keys: sortedTasks.map(task => task.id),
    config: {
        duration: 150
    }
  })

  // Handle clicking on the add task button
  const handleTaskAdd = () => {
    // Create an animated version of the AddTaskModal component using the react-spring animated function
    const AnimatedAddTaskModal = animated(AddTaskModal);

    // Show the AddTask modal
    showModal(<AnimatedAddTaskModal />)
  }

  const handleCategoryAdd = () => {
    // Create an animated version of the AddCategoryModal component using the react-spring animated function
    const AnimatedAddCategoryModal = animated(AddCategoryModal);

    // Show the AddCategory modal
    showModal(<AnimatedAddCategoryModal />)
  }

  // Create an animated version of the Task component to use with react-spring transitions
  const AnimatedTask = animated(Task);

  return (
    <div id='home-main-container' className={width < 850 ? 'full-width' : ''}>
      <div id='home-main-content'>
        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value.toLowerCase())} placeholder='Recherche une tâche...' id='search-bar' />
        {width > 580 && (
          <ul id='tasklist-header'>
            <TasklistHeaderElement label="Nom de la tâche" handleClick={() => setSortBy(sortBy === "title" ? null : "title")} isActive={sortBy === "title"} id='tasklist-header-task-title' />
            <TasklistHeaderElement label="Créateur" handleClick={() => setSortBy(sortBy === "owner" ? null : "owner")} isActive={sortBy === "owner"} id='tasklist-header-task-owner' />
            <TasklistHeaderElement label="Catégorie" handleClick={() => setSortBy(sortBy === "categoryName" ? null : "categoryName")} isActive={sortBy === "categoryName"} id='tasklist-header-task-category' />
          </ul>
        )}
        <hr id='tasklist-separator' />
        <ul id='tasktlist'>
          {tasksTransitions((style, task) => (
            (task.title.toLowerCase().includes(searchValue) || task.description.toLowerCase().includes(searchValue) || task.owner.toLowerCase().includes(searchValue)) &&
            <Fragment key={task.id}>
                <AnimatedTask key={task.id} task={task} style={style} />
            </Fragment>
          ))}
        </ul>
      </div>
      <div id='home-sticky-buttons-container'>
        <AccentButton label="Ajouter une tâche" handleClick={handleTaskAdd} className='home-sticky-button' />
        <AccentButton label="Ajouter une catégorie" handleClick={handleCategoryAdd} className='home-sticky-button' />
      </div>
    </div>
  );
}

export default TaskManager;