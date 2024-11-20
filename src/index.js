import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles/index.scss';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import NoPage from './pages/NoPage';
import ProtectedRoute from './components/ProtectedRoute';
import DatabaseInitializer from './components/DatabaseInitializer';
import ModalProvider from './components/ModalProvider';

// Create a Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><Home /></ProtectedRoute>,
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/signin",
    element: <SignIn />
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