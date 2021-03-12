import { Card } from './card.js';
import { initialCards } from './initial-cards.js';
import { FormValidator } from './validate.js';
import Section from './section.js';
import PopupWithImage from './popupwithimage.js';
import PopupWithForm from './popupwithform.js';
import UserInfo from './userinfo.js';


const profileFormElement = document.querySelector('.popup_type_edit').querySelector('.popup__form');
const addFormElement = document.querySelector('.popup_type_add').querySelector('.popup__form');
let nameInput = profileFormElement.querySelector('.popup__input_content_name');
let jobInput = profileFormElement.querySelector('.popup__input_content_job');
const elements = '.elements';
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');

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

const renderer = (item) => {
  const card = new Card(item, {
    cardSelector: '#element-template',
    handleCardClick: (name, link) => {
      const photoPopup = new PopupWithImage('.photo-popup');
      photoPopup.open(name, link);
      photoPopup.setEventListeners();
    }
  });
  const cardElement = card.generateCard();

  cardsList.addItem(cardElement);
  }

const cardsList = new Section({
  items: initialCards,
  renderer: renderer 
  },
  elements
)

//отрисовка карточек
cardsList.renderItems();

//логика работы попапов
const info = new UserInfo ('.profile__name', '.profile__description');

const popupWithEditForm = new PopupWithForm ({ 
  popupSelector: '.popup_type_edit', 
  handleFormSubmit: (data) => {
    info.setUserInfo(data);
    popupWithEditForm.close();
  }
})
popupWithEditForm.setEventListeners();

function handleEditButtonClick () {
    const userInfo = info.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.job;
  popupWithEditForm.open();
  editFormValidator.resetFormState();
}

const popupWithAddForm = new PopupWithForm ({ 
  popupSelector: '.popup_type_add', 
  handleFormSubmit: (item) => {
      renderer(item);
      popupWithAddForm.close();
  }
})
popupWithAddForm.setEventListeners();


editButton.addEventListener('click', handleEditButtonClick); 
addButton.addEventListener('click',  () => {
  popupWithAddForm.open();
  addFormValidator.resetFormState();
}); 




