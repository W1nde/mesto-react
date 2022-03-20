import React, {useState, useEffect, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupProfileEdit(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name);
  const [about, setAbout] = useState(currentUser?.about);
  
  const nameChangeHandler = (evt) => {
    setName(evt.target.value);
  }
  
  const aboutChangeHandler = (evt) => {
    setAbout(evt.target.value);
  }

  const submitHandler = (evt) => {
    evt.preventDefault();
    
    props.onUpdateUser({
      name: name,
      about: about
    });
    props.isClose();
  }

  useEffect(() => {
    if (currentUser) {
    setName(currentUser.name);
    setAbout(currentUser.about);
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
        value={about|| ''}
        placeholder="О себе"
        size="40"
        className="popup__input popup__input_type_job"
        minLength="2"
        maxLength="200"
        onChange={aboutChangeHandler}
        required
      />
        
      <span id="job-input-error" className="popup__input-error"></span>
      <button type="submit" className="popup__save">Сохранить</button>
    </PopupWithForm>
  )
}
export default PopupProfileEdit;