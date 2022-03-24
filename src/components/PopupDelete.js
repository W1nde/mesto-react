import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDelete(props) {

  function handleSubmit(evt) {
    evt.preventDefault();
    props.isClose();
    props.onCardDelete();    
  }

  return(
    <PopupWithForm 
      title="Вы уверены?" 
      name="pic-delete"
      isOpen={props.isOpen}
      onClose={props.onClose} 
      onSubmit={handleSubmit}
    >

      <button type="submit" className="popup__save">
        Да
      </button>

    </PopupWithForm>
  )
}

export default PopupDelete;