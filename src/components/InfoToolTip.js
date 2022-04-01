import React from 'react';
import success from '../images/info-success.svg';
import failure from '../images/info-failure.svg';

function InfoToolTip({ onClose, isOpen, isSuccess }) {

  return (
    <div className={`${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__content'>

        <button type='button' className='popup__close' onClick={onClose}/>
        <img src={isSuccess ? success : failure}
             alt={isSuccess ? 'Регистрация прошла успешно' : 'Ошибка, Вы не зарегистрированы'}
             className='popup__pic'/>
        <h2 className='popup__title'>
          {isSuccess ? 'Регистрация прошла успешно!' : 'Что-то пошло не так! Повторите попытку'}
        </h2>

      </div>
    </div>
  );
}

export default InfoToolTip;
