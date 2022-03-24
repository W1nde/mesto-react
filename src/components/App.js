import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
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
  const [cardToDelete, setCardToDelete] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  function handlePopupProfileClick() {
    setIsPopupProfileOpen(true);
  }

  function handlePopupPlaceClick() {
    setIsPopupPlaceOpen(true);
  }

  function handlePopupAvatarClick() {
    setIsPopupAvatarOpen(true);
  }

  function handlePopupDeleteClick(cardData) {
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

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
  }

  function handleUpdateUser(currentUser) {
    api
      .updateUserInfo({ name: currentUser.name, about: currentUser.about })
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(
        (err) => `Не удалось обновить данные пользователя, ошибка: ${err}`
      );
  }

  function handleUpdateAvatar({ avatar }) {
    api.updateAvatarInfo({avatar})
      .then((userData) => {
        setCurrentUser(userData)
      })
      .catch(err => `Не удалось обновить аватар, ошибка: ${err}`)
  }

  function handleLike(card) {
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

  function handleCardDelete(card) {
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

  function handleCardCreate({ name, link }) {
    api
      .addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => `Не удалось создать карточку, ошибка: ${err}`);
  }
  React.useEffect(() => {
    api.getInitialData()

    .then(([userData, cardsList]) => {
      setCurrentUser(userData);
      setCards(cardsList);
      })
      .catch((err) => `Данные пользователя не получены : ${err}`);
  }, []);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header />

          <Main
            onEditProfile={handlePopupProfileClick}
            onEditAvatar={handlePopupAvatarClick}
            onAddPlace={handlePopupPlaceClick}
            onCardLike={handleLike}
            onCardClick={handleCardClick}
            onСardDelete={handleCardDelete}
            onConfirmCardDelete={handlePopupDeleteClick}
            cards={cards}
          />

          <Footer />
        </div>

        <PopupAddPlace
          isOpen={isPopupAddOpen}
          onClose={closePopups}
          onCreateCard={handleCardCreate}
        />

        <PopupProfileEdit
          isOpen={isPopupProfileOpen}
          onClose={closePopups}
          onUpdateUser={handleUpdateUser}
        />

        <PopupAvatarEdit
          isOpen={isPopupAvatarOpen}
          onClose={closePopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupDelete
          isOpen={isPopupDeleteOpen}
          onClose={closePopups}
          onCardDelete={() => handleCardDelete(cardToDelete)}
        />

        <ImagePopup card={selectedCard} onClose={closePopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
