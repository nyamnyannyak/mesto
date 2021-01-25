const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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


function togglePopup (popup) {
  popup.classList.toggle ('popup_opened');
}

function openEditPopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup (editPopup);
}

function handleEditFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup (editPopup);
}

function render() {
  initialCards.forEach((item) => {
    renderElement(item.name, item.link)
  });
}

function createElement(name, link) {
  const elementTemplate = document.querySelector('#element-template').content;
  const galleryElement = elementTemplate.cloneNode(true);
  const galleryImage = galleryElement.querySelector('.element__image');
  galleryElement.querySelector('.element__like-button').addEventListener('click', photoLike)
  galleryElement.querySelector('.element__delete-button').addEventListener('click', handleDelete);
  galleryImage.src = link;
  galleryImage.alt = `Фото "${name}"`
  galleryElement.querySelector('.element__text').textContent = name; 
  galleryImage.addEventListener('click', openPhotoPopup);
  return galleryElement;
}

function photoLike (evt) {
  evt.target.classList.toggle('element__like-button_active'); 
}

function renderElement(name, link) {
  const element = createElement(name, link);
  document.querySelector('.elements').prepend(element); 
} 

function handleAddFormSubmit (evt) {
  evt.preventDefault(); 
  renderElement(placeInput.value, urlInput.value);
  togglePopup (addPopup);
  resetForm ();
}

function handleDelete(evt) {
  evt.target.closest('.element').remove();
}

function resetForm () {
  placeInput.value = "";
  urlInput.value = "";
}

function togglePhotoPopup () {
  photoPopup.classList.toggle ('photo-popup_opened');
}

function openPhotoPopup (evt) {
  togglePhotoPopup ();
  const popupImage = photoPopup.querySelector('.photo-popup__image');
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  photoPopup.querySelector('.photo-popup__text').textContent = evt.target.parentElement.querySelector('.element__text').textContent;
}

editButton.addEventListener('click', openEditPopup); 
editPopup.querySelector('.popup__close-button').addEventListener('click', () => togglePopup(editPopup)); 
document.querySelector('.profile__add-button').addEventListener('click', () => togglePopup(addPopup)); 
addPopup.querySelector('.popup__close-button').addEventListener('click', () => togglePopup(addPopup)); 
profileFormElement.addEventListener('submit', handleEditFormSubmit);
photoPopup.querySelector('.close-button').addEventListener('click', togglePhotoPopup); 
addFormElement.addEventListener('submit', handleAddFormSubmit);

render();

