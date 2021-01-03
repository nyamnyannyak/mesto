let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-button');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__description');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__field_content_name');
let jobInput = formElement.querySelector('.popup__field_content_job');


function togglePopup () {
  popup.classList.toggle ('popup_opened');
}

function openPopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  togglePopup ();
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup ();
}

editButton.addEventListener('click', openPopup); 
closeButton.addEventListener('click', togglePopup); 

formElement.addEventListener('submit', handleFormSubmit);