import { openPhotoPopup } from './index.js'
export class Card {
	constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this._name = data.name;
    this._link = data.link;
	}

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._link;
    elementImage.alt = `Фото "${this._name}"`;
    this._element.querySelector('.element__text').textContent = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeClick();
    });
		this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDelete()
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      openPhotoPopup(this._name, this._link)
    });
	}
  
  _handleLikeClick() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active'); 
  }
  
  _handleDelete() {
    this._element.remove();
    this._element = null;
  }
}
