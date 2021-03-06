export default class Card {
  constructor(cardData, {api, userId, cardSelector, handleCardClick, handleDeleteClick }) {
    this._cardSelector = cardSelector;
    this._card = cardData;
    this._handleCardClick = handleCardClick;
    this._api = api;
    this._userId = userId;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._card.link;
    elementImage.alt = `Фото "${this._card.name}"`;
    this._element.querySelector('.element__text').textContent = this._card.name;
    this._element.querySelector('.element__like-number').textContent = this._card.likes.length;
    this._showLikes();
    this._showDeleteIcon();
    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteClick(this._card._id, this._element);
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._card.name, this._card.link);
    });
  }

  _showLikes() {
    if (this._card.likes.some((elem) => elem._id === this._userId)) {
      this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
    }
  }

  _showDeleteIcon() {
    if (this._card.owner._id === this._userId) {
      this._element.querySelector('.element__delete-button').classList.remove('element__delete-button_disabled');
    }
  }

  _toggleLikeRequest() {
    if (this._card.likes.some((elem) => elem._id === this._userId)) {
      return this._api.removeLike(this._card._id);
    } else {
      return this._api.addLike(this._card._id);
    }
  }
  
  _handleLikeClick() {
    this._toggleLikeRequest() 
      .then((data) => {
        this._card = data;
        this._element.querySelector('.element__like-number').textContent = this._card.likes.length;
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
