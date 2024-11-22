import React, { Fragment } from 'react';
import UserListElement from './UserListElement';
import useUsersStore from '../zustand/useUsersStore';
import useWindowSize from '../hooks/useWindowSize';
import useUsersMenuStore from '../zustand/useUsersMenuStore';
import { animated, useTransition } from 'react-spring';

const UserManager = () => {

    // Retrieve the users from the users Zustand store
    const users = useUsersStore((state) => state.users);
    
    // Retrieve the screen width from the useWindowSize hook
    const { width } = useWindowSize();

    // Retrieve the menuIsOpen value from the users menu Zustand store
    const menuIsOpen = useUsersMenuStore(state => state.menuIsOpen);

    // Set up transitions for animating users list elements using react-spring
    const usersTransitions = useTransition(users.filter(user => !user.isAdmin), {
        from: { maxHeight: 50 },
        enter: { maxHeight: 50 },
        leave: { maxHeight: 0 },
        keys: users.filter(user => !user.isAdmin).map(user => user.id),
        config: {
            duration: 150
        }
    })

    // Create an animated version of the UserListElement component to use with react-spring transitions
    const AnimatedUserListElement = animated(UserListElement);

    return (
        <div id='user-manager' className={width < 850 ? (menuIsOpen ? 'mobile active' : 'mobile') : 'desktop'}>
            <h3 id='user-manager-title'>Utilisateurs</h3>
            <hr/>
            <ul id='users-list'>
                {usersTransitions((style, user) => (
                    <Fragment key={user.id}>
                        <AnimatedUserListElement user={user} className={width < 850 ? 'mobile' : 'desktop'} style={style} />
                        <hr/>
                    </Fragment>
                ))}
            </ul>
        </div>
    );
}

export default UserManager;