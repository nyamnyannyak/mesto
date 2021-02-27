export class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors,
    this._formElement = formElement
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectors.errorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._selectors.inputErrorClass);
    errorElement.classList.remove(this._selectors.errorClass);
    errorElement.textContent = '';
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _makeButtonDisabled (buttonElement) {
    buttonElement.classList.add(this._selectors.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "true");
  }

  _makeButtonActive (buttonElement) {
    buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }

  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._makeButtonDisabled (buttonElement);
    } else {
      this._makeButtonActive (buttonElement);
    }
  }

  _setEventListeners () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    const buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    })
  }
  
  _resetFormState () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
    const buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    this._removeInputErrors(inputList);
  }

  _removeInputErrors (inputList) {
    inputList.forEach((inputElement) => {
    this._hideInputError (inputElement);
    })
  }

  enableValidation () {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this._resetFormState();
    this._setEventListeners();
  }
}