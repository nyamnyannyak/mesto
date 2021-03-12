export default class FormValidator {
  constructor(selectors, formElement) {
    this._selectors = selectors,
    this._formElement = formElement
    this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
  }

  _showInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
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
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _makeButtonDisabled () {
    this._buttonElement.classList.add(this._selectors.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", "true");
  }

  _makeButtonActive () {
    this._buttonElement.classList.remove(this._selectors.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled");
  }

  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._makeButtonDisabled ();
    } else {
      this._makeButtonActive ();
    }
  }

  _setEventListeners () {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _removeInputErrors () {
    this._inputList.forEach((inputElement) => {
    this._hideInputError (inputElement);
    });
  }
  
  resetFormState () {
    this._toggleButtonState();
    this._removeInputErrors();
  }

  enableValidation () {
    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    this.resetFormState();
    this._setEventListeners();
  }
}