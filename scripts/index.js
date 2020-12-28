let editButton = document.querySelector('.profile__edit-button')
let popup = document.querySelector('.popup')
let closeButton = popup.querySelector('.popup__close-button')

function togglePopup () {
  popup.classList.toggle ('popup_opened')
}

editButton.addEventListener('click', togglePopup); 
closeButton.addEventListener('click', togglePopup); 

let formElement = popup.querySelector('.popup__form')

let profileName = document.querySelector('.profile__name')
let profileJob = document.querySelector('.profile__description') 
let nameInput = formElement.querySelector('.popup__field_content_name')
let jobInput = formElement.querySelector('.popup__field_content_job')

nameInput.value = profileName.textContent
jobInput.value = profileJob.textContent

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
}


formElement.addEventListener('submit', handleFormSubmit);

formElement.addEventListener('submit', togglePopup);