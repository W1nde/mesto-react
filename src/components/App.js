import React, { useState } from "react";
import "../pages/index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupAddPlace from "./PopupAddPlace";
import PopupDelete from "./PopupDelete";
import PopupProfileEdit from "./PopupProfileEdit";
import PopupAvatarEdit from "./PopupAvatarEdit";

function App() {
  const [cards, setCards] = useState([]);
  const [isPopupProfileOpen, setIsPopupProfileOpen] = useState(false);
  const [isPopupAddOpen, setIsPopupPlaceOpen] = useState(false);
  const [isPopupAvatarOpen, setIsPopupAvatarOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState();
  const [currentUser, setCurrentUser] = useState({});

  function popupProfileClickHandler() {
    setIsPopupProfileOpen(true);
  }

  function popupPlaceClickHandler() {
    setIsPopupPlaceOpen(true);
  }

  function popupAvatarClickHandler() {
    setIsPopupAvatarOpen(true);
  }

  function popupDeleteClickHandler(cardData) {
    setIsPopupDeleteOpen(true);
    setCardToDelete(cardData);
  }

  function closePopups() {
    setIsPopupProfileOpen(false);
    setIsPopupPlaceOpen(false);
    setIsPopupAvatarOpen(false);
    setIsPopupDeleteOpen(false);

    setSelectedCard(null);
  }

  function cardClickHandler(cardData) {
    setSelectedCard(cardData);
  }

  function updateUserHandler(currentUser) {
    api
      .updateUserInfo({ name: currentUser.name, job: currentUser.about })
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(
        (err) => `Не удалось обновить данные пользователя, ошибка: ${err}`
      );
  }

  function updateAvatarHandler({ avatar }) {
    api
      .updateAvatarInfo({ avatar })
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => `Не удалось обновить аватар, ошибка: ${err}`);
  }

  function likeHandler(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .like(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => `Не удалось обновить лайк, ошибка: ${err}`);
  }

  function cardDeleteHandler(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => {
            return c._id !== card._id;
          })
        );
      })
      .catch((err) => `Не удалось удалить карточку, ошибка: ${err}`);
  }

  function createCardHandler({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => `Не удалось создать карточку, ошибка: ${err}`);
  }
  React.useEffect(() => {
    Promise.all([api.getCards(), api.getUserInfo()])

      .then(([cards, userData]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => `Данные пользователя не получены : ${err}`);
  }, []);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />

          <Main
            onEditProfile={popupProfileClickHandler}
            onEditAvatar={popupAvatarClickHandler}
            onAddPlace={popupPlaceClickHandler}
            onLikeCard={likeHandler}
            onCardClick={cardClickHandler}
            onDeleteCard={popupDeleteClickHandler}
            onCardDeleteHandler={cardDeleteHandler}
            cards={cards}
          />

          <Footer />
        </div>

        <PopupAddPlace
          isOpen={isPopupAddOpen}
          isClose={closePopups}
          onCreateCard={createCardHandler}
        />

        <PopupProfileEdit
          isOpen={isPopupProfileOpen}
          isClose={closePopups}
          onUpdateUser={updateUserHandler}
        />

        <PopupAvatarEdit
          isOpen={isPopupAvatarOpen}
          isClose={closePopups}
          onUpdateUser={updateAvatarHandler}
        />

        <PopupDelete
          isOpen={isPopupDeleteOpen}
          isClose={closePopups}
          onCardDelete={() => cardDeleteHandler(cardToDelete)}
        />

        <ImagePopup card={selectedCard} onClose={closePopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
