import Popup from './popup.js';
export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super({ popupSelector });
    this._popupImage = this._popup.querySelector('.photo-popup__image');
    this._popupText = this._popup.querySelector('.photo-popup__text');
  }
  open (name, link) {
    super.open();
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupText.textContent = name; 
  }
}