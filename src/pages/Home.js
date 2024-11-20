import React from 'react';
import Header from '../components/Header';
import TaskManager from '../components/TaskManager';

const Home = () => {
  return (
    <div id='home-page'>
      <Header />
      <TaskManager />
    </div>
  )
}

export default Home;