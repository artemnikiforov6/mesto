const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close');
const popupOpenButton = document.querySelector('.profile__info-edit-button');
const formElement = document.querySelector('.popup__submit-form');
const nameInput = formElement.querySelector('#popup__name');
const jobInput = formElement.querySelector('#popup__about');
const profileName = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');


function openPopup(popup) {
  popup.classList.add("popup_opened")
 }

function closePopup(popup) {
   popup.classList.remove("popup_opened")
 }


function handleFormSubmit (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupElement);
}

formElement.addEventListener('submit', handleFormSubmit);

popupOpenButton.addEventListener("click", () => {

  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupElement)
})

popupCloseButton.addEventListener("click", () => {

  closePopup(popupElement)
})









