import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function PopupAddPlace(props) {
const [name, setName] = useState('');
const [link, setLink] = useState('');

const [placeError, setNameError] = useState('');
const [imageError, setLinkError] = useState('');

function placeChangeHandler(evt) {
  setNameError(evt.target.validationMessage);
  setName(evt.target.value);
}

function imageChangeHandler(evt) {
  setLinkError(evt.target.validationMessage);
  setLink(evt.target.value);
}

function addPlaceSubmitHandler(evt) {
  evt.preventDefault();

  props.onCreateCard({
    name,
    link
  });
  setName('');
  setLink('');
  props.isClose();
}

function isDisabled() {
  if (name === '' || link === '' || placeError !== '' || imageError !== '')  {
    return true
  } else {
    return false
  }
}

React.useEffect(() => {
  setName('');
  setLink('');
  setNameError('');
  setLinkError('');
}, [props.isOpen]);

  return (
    <PopupWithForm
        title="Новое место"
        name="add"
        isOpen={props.isOpen}
        onClose={props.isClose}
        onSubmit={addPlaceSubmitHandler}
    >

        <input
        id="card-name"
        type="text"
        name="name"
        placeholder="Название"
        size="40"
        className="popup__input popup__input_type_add"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={placeChangeHandler}
        required
        />
    
        <span id="card-name-error" className="popup__span error"></span>

        <input
        id="url"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        size="40"
        className="popup__input popup__input_type_url"
        value={link}
        onChange={imageChangeHandler}
        required
        />

        <span id="url-error" className="popup__span error"></span>

        <button type="submit" className={isDisabled() 
            ? "popup__save popup__save_disabled"
            : "popup__save"}>
            Создать
        </button>

    </PopupWithForm>
  )
}

export default PopupAddPlace;