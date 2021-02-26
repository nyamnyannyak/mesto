const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const profileFormElement = editPopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_content_name');
const jobInput = profileFormElement.querySelector('.popup__input_content_job');
const addFormElement = addPopup.querySelector('.popup__form');
const placeInput = addFormElement.querySelector('.popup__input_content_place');
const urlInput = addFormElement.querySelector('.popup__input_content_url');
const photoPopup = document.querySelector('.photo-popup');
const elements = document.querySelector('.elements');
const editPopupCloseButton = editPopup.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const addPopupCloseButton = addPopup.querySelector('.popup__close-button');
const photoPopupCloseButton = photoPopup.querySelector('.close-button');
const photoPopupImage = photoPopup.querySelector('.photo-popup__image');
const photoPopupText = photoPopup.querySelector('.photo-popup__text');
const createCardButton = addFormElement.querySelector('.popup__save-button');
const profileSaveButton = profileFormElement.querySelector('.popup__save-button');
const inactiveButtonSelector = 'popup__save-button_disabled';

class Card {
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

    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__text').textContent = this._name;
    this._element.querySelector('.element__image').alt = `Фото "${this._name}"`;

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
  }
}

function renderElement(item) {
  const card = new Card(item, '#element-template')
  const cardElement = card.generateCard();
  
	elements.prepend(cardElement); 
}

initialCards.forEach((item) => {
  renderElement(item)
});

function closePopup (popup) {
  popup.classList.remove ('opened-popup');
  document.removeEventListener('keydown', handleEscPress);
}

function openPopup (popup) {
  popup.classList.add ('opened-popup');
  document.addEventListener('keydown', handleEscPress);
}

function openPhotoPopup (name, link) {
  photoPopupImage.src = link;
  photoPopupImage.alt = name;
  photoPopupText.textContent = name;
  openPopup (photoPopup);
}

function openEditPopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup (editPopup);
  resetEditForm();
}

function resetEditForm () {
  removeInputErrors (profileFormElement);
  makeButtonActive (profileSaveButton, inactiveButtonSelector);
}

function openAddPopup () {
  openPopup(addPopup);
  resetAddForm ();
}

function resetAddForm () {
  removeInputErrors (addFormElement);
  makeButtonDisabled (createCardButton, inactiveButtonSelector);
  addFormElement.reset();
}

function handleEditFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup (editPopup);
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const item = {
    name: placeInput.value,
    link: urlInput.value,
  };
  renderElement(item);
  closePopup (addPopup);
}

function handleDelete(evt) {
  evt.target.closest('.element').remove();
}

function handleOverlayClick (evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
}

function handleEscPress (evt) {
    const openedPopup = document.querySelector('.opened-popup');
    if (evt.keyCode === 27) {
      closePopup (openedPopup);
    }
}

function setPopupListeners (popup) {
  popup.addEventListener('click', (evt) => handleOverlayClick (evt, popup));
  popup.querySelector('.close-button').addEventListener('click', () => closePopup(popup)); 
}

editButton.addEventListener('click', openEditPopup); 
addButton.addEventListener('click', openAddPopup); 
profileFormElement.addEventListener('submit', handleEditFormSubmit);
addFormElement.addEventListener('submit', handleAddFormSubmit);
setPopupListeners (addPopup);
setPopupListeners (editPopup);
setPopupListeners (photoPopup);


