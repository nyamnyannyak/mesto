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
const elementTemplate = document.querySelector('#element-template').content;
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

function closePopup (popup) {
  popup.classList.remove ('opened-popup');
  document.removeEventListener('keydown', handleEscPress);
}

function openPopup (popup) {
  popup.classList.add ('opened-popup');
  document.addEventListener('keydown', handleEscPress);
}

function openPhotoPopup (item) {
  photoPopupImage.src = item.link;
  photoPopupImage.alt = item.name;
  photoPopupText.textContent = item.name;
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

function render() {
  initialCards.forEach((item) => {
    renderElement(item, elements)
  });
}

function createElement(item) {
  const galleryElement = elementTemplate.cloneNode(true);
  const cardImage = galleryElement.querySelector('.element__image');
  const cardText = galleryElement.querySelector('.element__text');
  const likeButton = galleryElement.querySelector('.element__like-button');
  const deleteButton = galleryElement.querySelector('.element__delete-button');
  cardImage.src = item.link;
  cardImage.alt = `Фото "${item.name}"`;
  cardText.textContent = item.name; 
  likeButton.addEventListener('click', handleLikeClick);
  deleteButton.addEventListener('click', handleDelete);
  cardImage.addEventListener('click', () => openPhotoPopup(item));
  return galleryElement;
}

function renderElement(item, section) {
  const element = createElement(item);
  section.prepend(element); 
} 

function handleLikeClick (evt) {
  evt.target.classList.toggle('element__like-button_active'); 
}

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const item = {
    name: placeInput.value,
    link: urlInput.value,
  };
  renderElement(item, elements);
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

render();

