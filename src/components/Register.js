import React from 'react';
import {Link} from 'react-router-dom';
import { useFormValidation } from '../utils/formValidation';

function Register({ onRegister, name, isLoading, onAuthState }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();

  React.useEffect(() => {
    onAuthState(true);
  }, []);

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleRegisterSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onRegister(values);
  }

  return (
    <main className='content'>
      <section className='register'>
        <h2 className='register__title'>Регистрация</h2>

        <form 
          className='form'
          id={`${name}Form`}
          data-form={name}
          method='POST'
          action='#'
          noValidate

          onSubmit={handleRegisterSubmit}
        >

          <input 
            className='form__input'
            name='email'
            type='email'
            id='email-input'
            minLength='2'
            maxLength='40'
            placeholder='E-mail'
            required

            value={values.email || ''}
            onChange={handleChange}
          />

          <input
            className='form__input'
            type='password'
            name='password'
            id='password-input'
            minLength='2'
            maxLength='40'
            placeholder='Пароль'

            required
            value={values.password || ''}
            onChange={handleChange}
          />

          <button
            className='form__submit-button'
            type='submit'
            name='submit'
            value='Регистрация'
          />

        </form>

        <div className='auth__block'>
          <p className='auth__question'>Уже зарегистрированы?</p>
          <Link to='/sign-in' className='auth__link'>Войти</Link>
        </div>
      </section>
    </main>
  );
}

export default Register;