import React, {useState, useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupProfileEdit(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name);
  const [description, setDescription] = useState(currentUser?.about);
  
  const nameChangeHandler = (evt) => {
    setName(evt.target.value);
  }
  
  const descriptionChangeHandler = (evt) => {
    setDescription(evt.target.value);
  }

  const submitHandler = (evt) => {
    evt.preventDefault();
    
    props.onUpdateUser({
      name,
      about: description
    });
    props.isClose();
  }

  useEffect(() => {
    if (currentUser) {
    setName(currentUser.name);
    setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={submitHandler}
      >

      <input
        id="user-name"
        type="text"
        name="name"
        value={name || ''}
        placeholder="Имя"
        size="40"
        className="popup__input popup__input_type_name"
        minLength="2"
        maxLength="40"
        onChange={nameChangeHandler}
        required
      />

      <span id="name-input-error" className="popup__input-error"></span>

      <input
        id="job-input"
        type="text"
        name="job"
        value={description || ''}
        placeholder="О себе"
        size="40"
        className="popup__input popup__input_type_profession"
        minLength="2"
        maxLength="200"
        onChange={descriptionChangeHandler}
        required
      />
        
      <span id="job-input-error" className="popup__input-error"></span>
      <button type="submit" className="popup__submit-button">Сохранить</button>
    </PopupWithForm>
  )
}
export default PopupProfileEdit;