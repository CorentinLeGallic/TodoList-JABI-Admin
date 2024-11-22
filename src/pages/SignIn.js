import React, { useState } from 'react';
import Logo from '../components/Logo';
import AuthInput from '../components/AuthInput';
import AccentButton from '../components/AccentButton';
import isEmail from 'validator/lib/isEmail';
import { useNavigate } from "react-router-dom";
import AuthError from '../components/InputError';
import useAuthStore from '../zustand/useAuthStore';
import { useShallow } from 'zustand/shallow';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const SignIn = () => {

  // Initialise the useNavigate hook to be able to navigate to other screens
  const navigate = useNavigate();

  // Retrieve the the loginUser and logOut functions from the auth Zustand store
  const [loginUser, logOut] = useAuthStore(useShallow(state => [state.loginUser, state.logOut]));

  // Store all the AuthInput values
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // Store all the AuthInput value errors
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    credentials: null
  });

  // Handle the Log In form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Initialize a new empty object that will contain all the AuthInput value errors
    const newErrors = {
      email: null,
      password: null,
      credentials: null, // Will store the "invalid credentials" errors
    };

    // Reset the error object
    setErrors(newErrors);

    // Ensure all AuthInput fields are filled
    Object.entries(form).forEach(entry =>  {
      const [key, value] = entry;
      if(value.length === 0){
        console.warn(key + ' field is empty');

        // Store the error in the newErrors object
        newErrors[key] = 'Ce champ est obligaroire.';
      }
    })

    // Ensure the given mail adress is valid
    if(!isEmail(form.email) && !newErrors.email){
      console.warn('The email adress is invalid.');

      // Store the error in the newErrors object
      newErrors.email = "L'adresse email est invalide.";
    }

    // If there is at least one error, add the new AuthInput value errors to the errors object and return
    if(Object.values(newErrors).some(value => value)){
      console.warn('Got an error before auth attempt');
      setErrors(newErrors);
      return;
    }

    // Try to login using the loginUser function
    await loginUser(form.email, form.password)
      // If the user logged in successfully...
      .then(() => {
        // Try to get the user's document to check if he's an admin or not
        getDoc(doc(db, "users", useAuthStore.getState().user.uid))
          // If the user's document was retrieved successfully, ensure the user in an admin
          .then((userDoc) => {
            // If the user is an admin, show the Loader and redirect the user to the Home page
            if(userDoc.data().isAdmin){
              console.log("User signed in !");

              useAuthStore.setState({ isLoading: true });
              setTimeout(() => {
                useAuthStore.setState({ isLoading: false });
              }, 50);

              navigate("../");
            // If the user is not an admin, log out the user and add the errors to the errors object
            } else {
              console.warn('Invalid credentials');

              setErrors({ ...newErrors, credentials: "L'adresse email ou le mot de passe est incorrect." });
              logOut();
            }
          })
          // Else, handle errors that occured during the user's document retrieve
          .catch((error) => {
            console.error("An error occured while checking credentials : " + error.message);
            
            // Log out the user
            logOut();
          });
      })
      // Else, handle errors that occured during the login process
      .catch(error => {
        // If the email is invalid...
        if (error.code === 'auth/invalid-email') {
          if(!newErrors.email){
            console.log('Email invalid from auth');

            // ...store the error in the newErrors object
            newErrors.email = "L'adresse email est invalide.";
          }
        }

        // If the email adress or the password is invalid...
        if (error.code === 'auth/invalid-credential') {
          console.warn('Invalid credentials');

          // ...store the error in the newErrors object
          newErrors.credentials = "L'adresse email ou le mot de passe est incorrect.";
        }

        // Add the errors to the errors object
        setErrors({ ...newErrors });        
    });
  }

  return (
    <div id='signin-page'>
      <Logo mainFontSize={56} subFontSize={30} id='signin-logo' />
      <form className='signin-form' onSubmit={handleFormSubmit}>
        <h2 className='signin-title'>Se connecter</h2>
        <div className='signin-inputs-container'>
          <AuthInput label="Adresse email" value={form.email} handleInputChange={(e) => setForm({...form, email: e.target.value})} error={errors.email} />
          <AuthInput label="Password" value={form.password} handleInputChange={(e) => setForm({...form, password: e.target.value})} error={errors.password} isSecret={true} />
        </div>
        {errors.credentials && <AuthError label={errors.credentials} />}
        <AccentButton label="Se connecter" className='signin-form-button' />
      </form>
    </div>
  )
}

export default SignIn;