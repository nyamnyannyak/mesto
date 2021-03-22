import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'
import {
  profileFormElement,
  addFormElement,
  elements,
  addButton,
  editButton,
  nameInput,
  jobInput,
  formSelectors,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  token: 'd181f887-3fb4-45a4-8654-0b7723224428',
}); 

api.getInitialCards()
  .then((items) => {
    sortCards (items);
    cardsList.renderItems(items);
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  }); 
  
function sortCards (cards) {
  cards.sort(function(a, b){
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA-dateB;
  });
}


//создание секции с карточками
const cardsList = new Section(renderer,elements);
// отрисовка карточек из массива


//функция создания и отрисовки карточек
function renderer(item) {
  const card = new Card(item, api, {
    cardSelector: '#element-template',
    handleCardClick: (name, link) => {
      photoPopup.open(name, link);
    }
  });
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

//валидация
const addFormValidator = new FormValidator(formSelectors, addFormElement);
const editFormValidator = new FormValidator(formSelectors, profileFormElement);
addFormValidator.enableValidation();
editFormValidator.enableValidation();

//попапы
const photoPopup = new PopupWithImage('.photo-popup');
photoPopup.setEventListeners();

const info = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');
api.getUserInfo()
  .then((data) => {
    info.setUserInfo(data);
    info.setAvatar(data);
  })
  .catch((err) => {
    console.log(err); 
  })

const popupWithEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (formValues) => {
    api.changeProfileInfo (formValues)
      .then((userData) => {
        info.setUserInfo(userData);
        popupWithEditForm.close();
      })
      .catch((err) => {
        console.log(err); 
      })
  },
});
popupWithEditForm.setEventListeners();

const popupWithAddForm = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (formValues) => {
    api.addCard(formValues)
    .then((card) => {
      renderer(card);
      popupWithAddForm.close();
    })
    .catch((err) => {
      console.log(err); 
    })
    
  },
});
popupWithAddForm.setEventListeners();

function handleEditButtonClick() {
  const userInfo = info.getUserInfo();
  nameInput.value = userInfo.name;
  jobInput.value = userInfo.about;
  popupWithEditForm.open();
  editFormValidator.resetFormState();
}

function handleAddButtonClick() {
  popupWithAddForm.open();
  addFormValidator.resetFormState();
}

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);
