import { Card } from './card.js';
import { initialCards } from './initial-cards.js';
import { FormValidator } from './validate.js';

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
const addButton = document.querySelector('.profile__add-button');
const photoPopupImage = photoPopup.querySelector('.photo-popup__image');
const photoPopupText = photoPopup.querySelector('.photo-popup__text');

//настройки для валидации
const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  };
//создание классов валидации
const addFormValidator = new FormValidator(formSelectors, addFormElement);
const editFormValidator = new FormValidator(formSelectors, profileFormElement);

//функция отрисовки карточек
function renderElement(item) {
  const card = new Card(item, '#element-template');
  const cardElement = card.generateCard();
	elements.prepend(cardElement); 
}

//логика работы попапов
function closePopup (popup) {
  popup.classList.remove ('opened-popup');
  document.removeEventListener('keydown', handleEscPress);
}

function openPopup (popup) {
  popup.classList.add ('opened-popup');
  document.addEventListener('keydown', handleEscPress);
}

export function openPhotoPopup (name, link) {
  photoPopupImage.src = link;
  photoPopupImage.alt = name;
  photoPopupText.textContent = name;
  openPopup (photoPopup);
}

function openEditPopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup (editPopup);
  //вызываю валидацию формы
  editFormValidator.enableValidation();
}

function openAddPopup () {
  openPopup(addPopup);
  addFormElement.reset();
  //вызываю валидацию формы
  addFormValidator.enableValidation()
}

//обработчики
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

//отрисовка карточек из массива
initialCards.forEach((item) => {
  renderElement(item);
});


