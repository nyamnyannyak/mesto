export default class Api {
  constructor({ baseUrl, token}) {
    this._url = baseUrl;
    this._token = token;
  }
  
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  
  changeProfileInfo (data) {
    return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: {
    authorization: this._token,
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  addCard (data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
  }
  

  addLike (cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
      authorization: this._token
      }
    })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
  }

  removeLike (cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
      authorization: this._token
      }
    })
      .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
  }
}