import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, handleDelete }) {
    super({ popupSelector });
    this._handleDelete = handleDelete;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDelete(this._deletedCardId, this._deletedCard);
    });
  }

  open(cardId, card) {
    super.open();
    this._deletedCardId = cardId;
    this._deletedCard = card;
  }
}