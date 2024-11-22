import React from 'react';
import useUsersStore from '../zustand/useUsersStore';

const UserListElement = ({ user, className="", style={} }) => {

  // Retrieve the promoteUser function from the users Zustand store
  const promoteUser = useUsersStore(state => state.promoteUser);

  // Handle clicking on the promote user button
  const handleUserPromote = () => {

    // Try to promote the user using the promoteUser function
    promoteUser(user.id)
      // If the user was promoted successfully...
      .then(() => {
        // ...log it in the console
        console.log("User successfully promoted");
      })
      // Else, "handle" errors that occured during the user promoting process
      .catch(error => {
          console.error(error);
      })
  }

  return (
    <li className={'user-list-element ' + className} style={style}>
        <span className='username'>{user.username}</span>
        <button className='promote-user-button' onClick={handleUserPromote}>Promouvoir</button>
    </li>
  );
}

export default UserListElement;