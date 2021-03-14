export const profileFormElement = document.querySelector('.popup_type_edit').querySelector('.popup__form');
export const addFormElement = document.querySelector('.popup_type_add').querySelector('.popup__form');
export const elements = '.elements';
export const addButton = document.querySelector('.profile__add-button');
export const editButton = document.querySelector('.profile__edit-button');
export const nameInput = profileFormElement.querySelector('.popup__input_content_name');
export const jobInput = profileFormElement.querySelector('.popup__input_content_job');

//настройки для валидации
export const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
};
