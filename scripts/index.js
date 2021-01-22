const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__description');
const profileFormElement = editPopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__field_content_name');
const jobInput = profileFormElement.querySelector('.popup__field_content_job');
const cardFormElement = addPopup.querySelector('.popup__form');
const placeInput = cardFormElement.querySelector('.popup__field_content_place');
const urlInput = cardFormElement.querySelector('.popup__field_content_url');
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

editButton.addEventListener('click', openEditPopup); 
editPopup.querySelector('.popup__close-button').addEventListener('click', () => togglePopup(editPopup)); 
addButton.addEventListener('click', () => togglePopup(addPopup)); 
addPopup.querySelector('.popup__close-button').addEventListener('click', () => togglePopup(addPopup)); 

profileFormElement.addEventListener('submit', handleEditFormSubmit);

function render() {
  initialCards.forEach((item) => {
    renderElement(item.name, item.link)
  });
}

function createElement(name, link) {
  const elementTemplate = document.querySelector('#element-template').content;
  const galleryElement = elementTemplate.cloneNode(true);
  galleryElement.querySelector('.element__image').src = link;
  galleryElement.querySelector('.element__text').textContent = name; 
  return galleryElement;
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

function resetForm () {
  placeInput.value = "";
  urlInput.value = "";
}

cardFormElement.addEventListener('submit', handleAddFormSubmit);

render();