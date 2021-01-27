const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const profileFormElement = editPopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__field_content_name');
const jobInput = profileFormElement.querySelector('.popup__field_content_job');
const addFormElement = addPopup.querySelector('.popup__form');
const placeInput = addFormElement.querySelector('.popup__field_content_place');
const urlInput = addFormElement.querySelector('.popup__field_content_url');
const photoPopup = document.querySelector('.photo-popup');
const elementTemplate = document.querySelector('#element-template').content;
const elements = document.querySelector('.elements');
const editPopupCloseButton = editPopup.querySelector('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const addPopupCloseButton = addPopup.querySelector('.popup__close-button');
const photoPopupCloseButton = photoPopup.querySelector('.close-button');



function closePopup (popup) {
  popup.classList.remove ('opened-popup');
}

function openPopup (popup) {
  popup.classList.add ('opened-popup');
}

function openEditPopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup (editPopup);
}

function handleEditFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup (editPopup);
}

function render() {
  initialCards.forEach((item) => {
    renderElement(item)
  });
}

function createElement(item) {
  const galleryElement = elementTemplate.cloneNode(true);
  const galleryImage = galleryElement.querySelector('.element__image');
  galleryElement.querySelector('.element__like-button').addEventListener('click', handleLikeClick)
  galleryElement.querySelector('.element__delete-button').addEventListener('click', handleDelete);
  galleryImage.src = item.link;
  galleryImage.alt = `Фото "${name}"`
  galleryElement.querySelector('.element__text').textContent = item.name; 
  galleryImage.addEventListener('click', () => openPhotoPopup(item));
  return galleryElement;
}

function handleLikeClick (evt) {
  evt.target.classList.toggle('element__like-button_active'); 
}

function renderElement(item) {
  const element = createElement(item);
  elements.prepend(element); 
} 

function handleAddFormSubmit (evt) {
  evt.preventDefault();
  const item = {
    name: placeInput.value,
    link: urlInput.value,
  };
  renderElement(item);
  closrPopup (addPopup);
  addFormElement.reset();
}

function handleDelete(evt) {
  evt.target.closest('.element').remove();
}


function openPhotoPopup (item) {
  const popupImage = photoPopup.querySelector('.photo-popup__image');
  popupImage.src = item.link;
  popupImage.alt = item.name;
  photoPopup.querySelector('.photo-popup__text').textContent = item.name;
  openPopup (photoPopup);
}

editButton.addEventListener('click', openEditPopup); 
editPopupCloseButton.addEventListener('click', () => closePopup(editPopup)); 
addButton.addEventListener('click', () => openPopup(addPopup)); 
addPopupCloseButton.addEventListener('click', () => closePopup(addPopup)); 
profileFormElement.addEventListener('submit', handleEditFormSubmit);
photoPopupCloseButton.addEventListener('click', () => closePopup(photoPopup)); 
addFormElement.addEventListener('submit', handleAddFormSubmit);

render();

