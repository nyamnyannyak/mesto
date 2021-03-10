import { Card } from './card.js';
import { initialCards } from './initial-cards.js';
import { FormValidator } from './validate.js';
import Section from './section.js';
import Popup from './popup.js';

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
const elements = '.elements';
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
//вызываю валидацию форм
addFormValidator.enableValidation()
editFormValidator.enableValidation();

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#element-template');
    const cardElement = card.generateCard();

    cardsList.addItem(cardElement);
    },
  },
  elements
);
//отрисовка карточек
cardsList.renderItems();

//логика работы попапов


export function openPhotoPopup (name, link) {
  photoPopupImage.src = link;
  photoPopupImage.alt = name;
  photoPopupText.textContent = name;
  // openPopup (photoPopup);
}

// function openEditPopup () {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   openPopup (editPopup);
//   editFormValidator.resetFormState();
// }

// function openAddPopup () {
//   openPopup(addPopup);
//   addFormElement.reset();
//   addFormValidator.resetFormState();
// }

//обработчики
// function handleEditFormSubmit (evt) {
//     evt.preventDefault(); 
//     profileName.textContent = nameInput.value;
//     profileJob.textContent = jobInput.value;
//     closePopup (editPopup);
// }

// function handleAddFormSubmit (evt) {
//   evt.preventDefault();
//   const item = {
//     name: placeInput.value,
//     link: urlInput.value,
//   };
//   renderElement(item);
//   closePopup (addPopup);
// }

function openPopup(popupSelector) {
  const openedPopup = new Popup(popupSelector);
  openedPopup.setEventListeners();
  openedPopup.open();
}

editButton.addEventListener('click', () => {
  openPopup('.popup_type_edit')}); 
addButton.addEventListener('click',  () => {
  openPopup('.popup_type_edit')}); 
// profileFormElement.addEventListener('submit', handleEditFormSubmit);
// addFormElement.addEventListener('submit', handleAddFormSubmit);



