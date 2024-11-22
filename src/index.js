import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/index.scss';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import NoPage from './pages/NoPage';
import ProtectedRoute from './components/ProtectedRoute';
import DatabaseInitializer from './components/DatabaseInitializer';
import ModalProvider from './components/ModalProvider';
import Loader from './components/Loader';

// Create a Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Loader><ProtectedRoute><Home /></ProtectedRoute></Loader>,
  },
  {
    path: "/signin",
    element: <Loader><SignIn /></Loader>
  },
  {
    path: "*",
    element: <NoPage />
  },
]);

// Set the root element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DatabaseInitializer>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </DatabaseInitializer>
  </React.StrictMode>
);