import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import {
  profileFormElement,
  addFormElement,
  avatarFormElement,
  elements,
  addButton,
  editButton,
  nameInput,
  jobInput,
  formSelectors,
  avatarEditIcon,
} from '../utils/constants.js';

//создаем класс апи
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  token: 'd181f887-3fb4-45a4-8654-0b7723224428',
});

const info = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');
//подгружаем информацию о пользователе
api.getUserInfo()
  .then((data) => {
    info.setUserInfo(data);
    info.setAvatar(data);
  })
  .catch((err) => {
    console.log(err);
  });

//создание секции с карточками
const cardsList = new Section(renderer, elements);
// отрисовка карточек из массива и сортировка
api.getInitialCards()
  .then((items) => {
    sortCards(items);
    cardsList.renderItems(items);
  })
  .catch((err) => {
    console.log(err);
  });

function sortCards(cards) {
  cards.sort(function (a, b) {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateA - dateB;
  });
}

//функция создания и отрисовки карточек
function renderer(item) {
  const card = new Card(item, api, {
    cardSelector: '#element-template',
    handleCardClick: (name, link) => {
      photoPopup.open(name, link);
    },
    handleDeleteClick: (cardId, card) => {
      popupWithConfirm.open(cardId, card);
    },
  });
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

//валидация
const addFormValidator = new FormValidator(formSelectors, addFormElement);
const editFormValidator = new FormValidator(formSelectors, profileFormElement);
const avatarFormValidator = new FormValidator(formSelectors, avatarFormElement);
addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();

//попапы
const photoPopup = new PopupWithImage('.photo-popup');
photoPopup.setEventListeners();

const popupWithConfirm = new PopupWithConfirm({
  popupSelector: '.popup_type_delete',
  handleDelete: (cardId, card) => {
    api.deleteCard(cardId)
      .then(() => {
        card.remove();
        popupWithConfirm.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
popupWithConfirm.setEventListeners();

const popupWithEditForm = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (formValues) => {
    api.changeProfileInfo(formValues)
      .then((userData) => {
        info.setUserInfo(userData);
        popupWithEditForm.close();
      })
      .catch((err) => {
        console.log(err);
      });
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
      });
  },
});
popupWithAddForm.setEventListeners();

const popupWithAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (formValues) => {
    api.changeAvatar(formValues)
      .then((userData) => {
        info.setAvatar(userData);
        popupWithAvatarForm.close();
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
popupWithAvatarForm.setEventListeners();

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

function handleAvatarClick() {
  popupWithAvatarForm.open();
  avatarFormValidator.resetFormState();
}

editButton.addEventListener('click', handleEditButtonClick);
addButton.addEventListener('click', handleAddButtonClick);
avatarEditIcon.addEventListener('click', handleAvatarClick);
