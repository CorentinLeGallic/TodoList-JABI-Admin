import React from 'react';
import Header from '../components/Header';
import TaskManager from '../components/TaskManager';
import UserManager from '../components/UserManager';

const Home = () => {

  return (
    <div id='home-page'>
      <Header />
      <main id='home-main'>
        <TaskManager />
        <UserManager />
      </main>
    </div>
  )
}

export default Home;