class Api {

  constructor( {adress, token} ) {
    this._adress = adress;
    this._token = token;
  }

  getCards() {
    return fetch(`${this._adress}/cards`, {
      headers: {
        authorization: this._token
      }
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  addCard({name, link}) {
    return fetch(`${this._adress}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  getUserInfo() {
    return fetch(`${this._adress}/users/me`, {
      headers: {
        authorization: this._token
      }
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  updateUserInfo = ({name, about}) => {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-35/users/me', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about: about
      })
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }

  updateAvatarInfo = (avatar) => {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-35/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar,
      })
    }).then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  }
  
  deleteCard(_id) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-35/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(this._handleResponse)
  }

  like = (_id, isLiked) => {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-35/cards/${_id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(this._handleResponse)
  }

  getInitialData() {
    return Promise.all([this.getUser(), this.getCards()]);
  }
}

const api = new Api ({
  adress: 'https://mesto.nomoreparties.co/v1/cohort-35/',
  token: '3fdbcb9c-8f37-4908-83ea-7fa8f283a235'
})

export default api;