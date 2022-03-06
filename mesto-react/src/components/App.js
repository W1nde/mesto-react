import React, { useState } from "react";
import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isPopupProfileOpen, setIsPopupProfileOpen] = useState(false);
  const [isPopupAddOpen, setIsPopupPlaceOpen] = useState(false);
  const [isPopupAvatarOpen, setIsPopupAvatarOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  function popupProfileHandler() {
    setIsPopupProfileOpen(true)
  }

  function popupPlaceHandler() {
    setIsPopupPlaceOpen(true)
  }

  function popupAvatarHandler() {
    setIsPopupAvatarOpen(true)
  }

  function popupCls() {
    setIsPopupProfileOpen(false);
    setIsPopupPlaceOpen(false);
    setIsPopupAvatarOpen(false);

    setSelectedCard(null);
  }

  function cardClickHandler(cardData) {
    setSelectedCard(cardData);
  }

  return (
    <div className="page">
      <div className="page__container">

        <Header/>

        <Main
          onEditProfile={popupProfileHandler}
          onAddPlace={popupPlaceHandler}
          onEditAvatar={popupAvatarHandler}
          onCardClick={cardClickHandler}
        />

        <Footer/>

      </div>

      <PopupWithForm
        title="Редактировать профиль"
        name="edit"
        isOpen={isPopupProfileOpen}
        onClose={popupCls}
      >
        <input
          id="user-name"
          type="text"
          name="name"
          placeholder="Имя"
          size="40"
          className="popup__input popup__input_type_name"
          minLength="2"
          maxLength="40"
          required
        />

        <span id="user-name-error" className="popup__span error"></span>

        <input
          id="job"
          type="text"
          name="job"
          placeholder="О себе"
          size="40"
          className="popup__input popup__input_type_job"
          minLength="2"
          maxLength="200"
          required
        />

        <span id="job-error" className="popup__span error"></span>

        <button type="submit" className="popup__save">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm
        title="Новое место"
        name="add"
        isOpen={isPopupAddOpen}
        onClose={popupCls}
      >
        <input
          id="card-name"
          type="text"
          name="place"
          placeholder="Название"
          size="40"
          className="popup__input popup__input_type_add"
          minLength="2"
          maxLength="30"
          required
        />

        <span id="card-name-error" className="popup__input error"></span>

        <input
          id="url"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          size="40"
          className="popup__input popup__input_type_url"
          required
        />

        <span id="url-error" className="popup__input error"></span>


        <button type="submit" className="popup__save">Создать</button>
      </PopupWithForm>

      <PopupWithForm
        title="Обновить аватар"
        name="avatar-update"
        isOpen={isPopupAvatarOpen}
        onClose={popupCls}
      >
        <input
          id="url-avatar"
          type="url"
          name="avatar"
          placeholder="Ссылка на изображение"
          size="40"
          className="popup__input popup__input_type_avatar-url"
          required
        />

        <span id="avatar-input-error"   name="popup__input error"></span>

        <button type="submit" className="popup__save">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm
       title="Вы уверены?" name="pic-delete">
        <button type="submit" className="popup__save">Да</button>
      </PopupWithForm>


      <ImagePopup card={selectedCard} onClose={popupCls} />
    </div>
  );
}

export default App