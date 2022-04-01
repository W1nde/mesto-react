import React, { useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import Register from './Register'
import Login from './Login'

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupAddPlace from './PopupAddPlace';
import PopupDelete from './PopupDelete';
import PopupProfileEdit from './PopupProfileEdit';
import PopupAvatarEdit from './PopupAvatarEdit';

import InfoToolTip from './InfoToolTip'

import api from '../utils/api';
import * as auth from '../utils/auth.js';

function App() {
  const [cards, setCards] = useState([]);
  const [isPopupProfileOpen, setIsPopupProfileOpen] = useState(false);
  const [isPopupAddOpen, setIsPopupPlaceOpen] = useState(false);
  const [isPopupAvatarOpen, setIsPopupAvatarOpen] = useState(false);
  const [isPopupDeleteOpen, setIsPopupDeleteOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = React.useState(false)

  const [userData, setUserData] = React.useState(null);

  const [load, setLoad] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState(false);

  const [isLoadingLoader, setIsLoadingLoader] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const [authState, setAuthState] = React.useState(false);
  
  const [isPopupInfoToolTipOpen, setIsPopupInfoToolTipOpen] = React.useState(false);

  const history = useHistory()

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
    setIsInfoToolTipPopupOpen(false);

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

  function handleSignOut() {
    return auth.signOut()
      .then(() => {
        setLoad(false);
        setLoggedIn(false);
        history.push('/sign-in');
      })
      .catch((err) => {
        console.log(err);
      })
  }










  React.useEffect(() => {
    api.getInitialData()

    .then(([userData, cardsList]) => {
      setCurrentUser(userData);
      setCards(cardsList);
      })
      .catch((err) => `Данные пользователя не получены : ${err}`);
  }, []);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    setLoad(true);
    auth.getContent()
      .then((res) => {
        if (res) {
          setUserData({
            id: res._id,
            email: res.email
          });
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch(err => {
        setLoad(false);
        console.log(err);
        history.push('/sign-in');
      });
  }

  function handleRegisterPopup(state) {
    setIsSuccess(state);
    setIsPopupInfoToolTipOpen(true);
  }

  function handleRegister({ email, password }) {
    setIsLoading(true);
    return auth.register(email, password)
      .then(() => {
        handleRegisterPopup(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        handleRegisterPopup(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  function handleAuthState(state) {
    setAuthState(state);
  }

  function handleLogin({ email, password }) {
    setIsLoading(true);
    return auth.authorize(email, password)
      .then(() => {
        tokenCheck();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <div className='page__container'>
          <Header
            loggedIn={loggedIn}
            userData={userData}
            onSignOut={handleSignOut}
            authState={authState}
            load={load}
          />

          <Switch>

            <ProtectedRoute
              exact patch='/'
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handlePopupProfileClick}
              onEditAvatar={handlePopupAvatarClick}
              onAddPlace={handlePopupPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleLike}
              cards={cards}
              isLoading={isLoadingLoader}
            />

            <Route path='/sign-up'>
              <Register
                name='register'
                onRegister={handleRegister}
                isLoading={isLoading}
                onAuthState={handleAuthState}
              />
            </Route>

            <Route path='/sign-in'>
              <Login
                name='login'
                onLogin={handleLogin}
                isLoading={isLoading}
                onAuthState={handleAuthState}
              />
            </Route>

            <Route>
              {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
            </Route>

          </Switch>







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

        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closePopups}
          isSuccess={isSuccess}
        />

        <ImagePopup card={selectedCard} onClose={closePopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
