const profileButton = document.querySelector('.profile__edit-button');

function showInputError (formElement, inputElement, errorMessage, selectors) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
};

function hideInputError (formElement, inputElement, selectors) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.remove(selectors.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity (formElement, inputElement, selectors) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
  } else {
    hideInputError(formElement, inputElement, selectors);
  }
};

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function makeButtonDisabled (buttonElement, inactiveSelector) {
  buttonElement.classList.add(inactiveSelector);
  buttonElement.setAttribute("disabled", "true");
}

function makeButtonActive (buttonElement, inactiveSelector) {
  buttonElement.classList.remove(inactiveSelector);
  buttonElement.removeAttribute("disabled");
}

function toggleButtonState (inputList, buttonElement, selectors) {
  if (hasInvalidInput(inputList)) {
    makeButtonDisabled (buttonElement, selectors.inactiveButtonClass)
  } else {
    makeButtonActive (buttonElement, selectors.inactiveButtonClass)
  }
};

function setEventListeners (formElement, selectors) {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, selectors);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, selectors);
      toggleButtonState(inputList, buttonElement, selectors);
    });
  })
}

function enableValidation (selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, selectors);
  });
};

function removeInputErrors (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const errorSelectors = {
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible',
  }
  inputList.forEach((inputElement) => {
    hideInputError (formElement, inputElement, errorSelectors);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
});