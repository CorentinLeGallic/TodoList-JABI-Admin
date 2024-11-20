import React from 'react';

const TasklistHeaderElement = ({ label, handleClick, isActive, id="" }) => {
  return (
    <li className='tasklist-header-element' id={id} onClick={handleClick}>
        <span className='tasklist-header-element-label'>{label}</span>
          <svg className={"tasklist-header-element-indicator" + (isActive ? " active" : "")} xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24">
              <rect x="0" fill="none" width="24" height="24" />
              <g>
                  <path d="M20 9l-8 8-8-8 1.414-1.414L12 14.172l6.586-6.586" />
              </g>
          </svg>
    </li>
  );
}

export default TasklistHeaderElement;