import React from 'react';
import {Link} from 'react-router-dom';
import { useFormValidation } from '../utils/formValidation';

function Login({ onLogin, name, isLoading, onAuthState }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation();

  React.useEffect(() => {
    onAuthState(false);
  }, []);

  React.useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleLoginSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values);
  }

  return (

    <main className='page'>
      <section className='login'>
        <h2 className='login__title'>Вход</h2>

        <form
            className='form'
            id={`${name}Form`}
            data-form={name}
            method='POST'
            action='#'
            noValidate 

            onSubmit={handleLoginSubmit}
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
                name='password'
                type='password'
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
                name='submit'
                type='submit'
                value={`${isLoading ? 'Вход' : 'Войти'}`}
                disabled={!isValid || isLoading}
            />

        </form>

        <div className='auth__block'>
          <p className='auth__question'>Ещё не зарегистрированы?</p>
          <Link to='/sign-up' className='auth__link'>Регистрация</Link>
        </div>
      </section>
    </main>

  );
}

export default Login;
