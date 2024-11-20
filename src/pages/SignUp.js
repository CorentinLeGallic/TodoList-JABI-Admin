import React, { useState } from 'react';
import isEmail from 'validator/lib/isEmail'
import Logo from '../components/Logo';
import AuthInput from '../components/AuthInput';
import AccentButton from '../components/AccentButton';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../zustand/useAuthStore';

const SignUp = () => {

  // Initialise the useNavigate hook to be able to navigate to other screens
  const navigate = useNavigate();

  // Retrieve the createUser function from the auth Zustand store
  const createUser = useAuthStore(state => state.createUser);

  // Store all the AuthInput values
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  // Store all the AuthInput value errors
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  })

  // Handle the Sign In form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Initialize a new empty array that will contain all the AuthInput value errors
    const newErrors = {
      username: null,
      email: null,
      password: null,
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

    // Ensure the password is at least 6 characters long (= Firebase Authentification's minimum password lenght)
    if(form.password.length < 6 && !newErrors.password){
      console.warn('The password should be at least 6 characters long.');

      // Store the error in the newErrors object
      newErrors.password = 'Le mot de passe doit comporter au moins 6 caractères.';
    }

    // Ensure the given mail adress is valid
    if(!isEmail(form.email) && !newErrors.email){
      console.warn('The email adress is invalid.');

      // Store the error in the newErrors object
      newErrors.email = "L'adresse email est invalide.";
    }

    // If there is at least one error, add the new AuthInput value errors to the errors object and return
    if(Object.values(newErrors).some(value => value)){
      console.log('Got an error before auth attempt');
      setErrors(newErrors);
      return;
    }

    // Try to create a new user using the createUser function
    await createUser(form.email, form.password, form.username)
    // If the user was created successfully...
    .then(() => {
      console.log("User logged in !");
      // ...navigate to the home screen
      navigate("../");
    })
    // Else, handle errors that occured during the account creation
    .catch((error) => {
      // If the email is invalid...
      if (error.code === 'auth/invalid-email') {
        if(!newErrors.email){
          console.log('Email invalid from auth');

          // ...store the error in the newErrors object
          newErrors.email = "L'adresse email est invalide.";
        }
      }

      // If the email is already in use...
      if (error.code === 'auth/email-already-in-use') {
        if(!newErrors.email){
          console.log('Email already used from auth');

          // ...store the error in the newErrors object
          newErrors.email = 'Cette adresse email est déjà utilisée.';
        }
      }

      // Add the errors to the errors object
      setErrors({ ...newErrors });

      console.error(error);
    })
  }

  return (
    <div className='auth-page'>
      <Logo fontSize={56} />
      <form className='auth-form' onSubmit={handleFormSubmit}>
        <h2 className='auth-title'>Créer un compte</h2>
        <div className='auth-inputs-container'>
          <AuthInput label="Nom d'utilisateur" value={form.username} handleInputChange={(e) => setForm({...form, username: e.target.value})} error={errors.username} />
          <AuthInput label="Adresse email" value={form.email} handleInputChange={(e) => setForm({...form, email: e.target.value})} error={errors.email} />
          <AuthInput label="Password" value={form.password} handleInputChange={(e) => setForm({...form, password: e.target.value})} error={errors.password} isSecret={true} />
        </div>
        <AccentButton label="S'enregistrer" className='auth-form-button' />
        <div className='auth-switch-container'>
          <span className='auth-switch-text'>Vous avez déjà un compte ?</span>
          <Link to="/signin" className='auth-switch-link'>Connectez-vous !</Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp;