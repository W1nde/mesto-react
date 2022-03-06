import React, {useState} from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick}) {

  const [userName, setUserName] = useState('');
  const [userAbout, setUserAbout] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api.getUserInfo()
    .then((userData) => {
      setUserName(userData.name);
      setUserAbout(userData.about);
      setUserAvatar(userData.avatar);
    })
    .catch(err => `Не удалось получить данные пользователя, ошибка: ${err}`)

    api.getCards()
    .then((cardsList) => {
      setCards(cardsList);
    })
    .catch(err => `Не удалось получить данные карточек, ошибка: ${err}`)
  }, [])

  return (
    <main className="main">
      <section className="profile">

        <div onClick={onEditAvatar} 
        className="profile__avatar"
        style={{ backgroundImage: `url(${userAvatar})` }}>
        </div>

          <div className="profile__info">
            <div className='profile__row'>
              <h1 className="profile__name">{userName}</h1>
              <button type="button" onClick={onEditProfile} className="profile__edit-button"></button>
            </div>
            <p className="profile__job">{userAbout}</p>
          </div>



        <button type="button" onClick={onAddPlace} className="profile__add-button"></button>
      </section>

      <section className="elements">
        {cards.map((cardData) => (
          <Card 
            card={cardData}
            key={cardData._id}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;