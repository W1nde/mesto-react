export const BASE_URL = 'https://api.apro.students.nomoreparties.xyz';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then((res) => {
      if (res.status === 400) {
        throw new Error('Некорректное заполнение поля или полей');
      } else if (res.status === 409) {
        throw new Error('E-mail уже испольтзуется');
      } else if (res.status === 200) {
        return res.json();
      }
      throw new Error('Ошибка сервера');
    })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ email, password })
  })
    .then(res => {
      if (res.status === 200) {
        return;
      }
      if (res.status === 400) {
        throw new Error('Ошибка в передаче поля или полей');
      }
      if (res.status === 401) {
        throw new Error('Указанный e-mail незарегестрирован');
      }
      throw new Error(`Ошибка авторизации: ${res.status}`);
    })
};

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      if (res.status === 401) {
        throw new Error('Ошибка в передаче токена');
      }
      if (res.status === 400) {
        throw new Error('Некорректное заполнение токена');
      }
      throw new Error(`Ошибка токена: ${res.status}`);
    })
};

export const signOut = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((res) => {
      if (res.status === 200) {
        return;
      }
      throw new Error(`Ошибка: ${res.status}`);
    })
};