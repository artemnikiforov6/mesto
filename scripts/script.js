const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close');
const popupProfileOpenButton = document.querySelector('.profile__info-edit-button');
const popupAddButton = document.querySelector('.profile__info-add-button');
const formElement = document.querySelector('.popup__submit-form');
const newPlaceElement = document.querySelector('.popup__newplace-form');
const nameInput = formElement.querySelector('#popup__name');
const jobInput = formElement.querySelector('#popup__about');
const profileName = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const popupEditForm = document.querySelector('.popup_edit-form');
const popupAddForm = document.querySelector('.popup_add-form');
const popupEdiFormClose = document.querySelector('.popup_edit-form-close');
const popupAddFormClose = document.querySelector('.popup_add-form-close');


//функция открытия и закрытия попапа.
function openPopup(popup) {
  popup.classList.add('popup_opened')
 };

function closePopup(popup) {
   popup.classList.remove('popup_opened')
 };


//Обработчик «отправки» формы.
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupElement);
};

//Следим за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);

//Открываем форму редактирования профиля.
popupProfileOpenButton.addEventListener('click', () => {

  nameInput.value = profileName.textContent;
  jobInput.value = profileSubtitle.textContent;
  openPopup(popupEditForm)
});

popupEdiFormClose.addEventListener('click', () => {
  closePopup(popupEditForm)
});


//Массив с карточками
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


const cardsContainer = document.querySelector('.elements');
const templateCard = document.querySelector('#elements__element').content;





//функция создания новой карточки
const createCard = (card) => {
    const userCard = templateCard.cloneNode(true);
    const cardImage = userCard.querySelector('.elements__picture');
    const cardTitle = userCard.querySelector('.elements__title');


    cardImage.src = card.link;
    cardTitle.textContent = card.name;

    cardImage.addEventListener('click', function() {

      const popupImageCard = document.querySelector('.popup__image');
      const popupImage = popupImageCard.querySelector('.popup__image-element');
      const popupImageTitle = popupImageCard.querySelector('.popup__image-title');

      popupImage.src = cardImage.src;
      popupImageTitle.textContent = cardTitle.textContent;

      openPopup(popupImageCard);

      document.querySelector('.popup__image-close').addEventListener('click', () => {

      closePopup(popupImageCard)
      });
    });



    userCard.querySelector('.elements__vector').addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__vector_active');
    });

    const deleteButton = userCard.querySelector('.elements__trash');

    deleteButton.addEventListener('click', function () {
      const card = deleteButton.closest('.elements__element');
      card.remove();
    });

    return userCard;
}





//помещаем новую карточку в верстку
const renderCard = (cards, cardsContainer) => {
    cards.forEach(card => {
        const userCard = createCard(card);
        cardsContainer.appendChild(userCard);
    })
}


renderCard(initialCards, cardsContainer);


popupAddButton.addEventListener('click', () => {
  openPopup(popupAddForm)
});

popupAddFormClose.addEventListener('click', () => {

  closePopup(popupAddForm)
});

//Обработчик «отправки» формы создания новой карточки
function handleAddFormSubmit (evt) {
  evt.preventDefault();
  addCard();
  closePopup(popupAddForm);
  evt.target.reset();
}

newPlaceElement.addEventListener('submit', handleAddFormSubmit);

function addCard (card) {
  const cardsContainer = document.querySelector('.elements');
  const templateCard = document.querySelector('#elements__element').content;
  const cardElement = templateCard.querySelector('.elements__element').cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__picture');
  const cardTitle = cardElement.querySelector('.elements__title');
  const cardNameInput = popupAddForm.querySelector('#popup__name_place');
  const cardUrlInput = popupAddForm.querySelector('#popup__link_place');

  cardImage.addEventListener('click', function() {

    const popupImageCard = document.querySelector('.popup__image');
    const popupImage = popupImageCard.querySelector('.popup__image-element');
    const popupImageTitle = popupImageCard.querySelector('.popup__image-title');

    popupImage.src = cardImage.src;
    popupImageTitle.textContent = cardTitle.textContent;

    openPopup(popupImageCard);

    document.querySelector('.popup__image-close').addEventListener('click', () => {

    closePopup(popupImageCard)
    });
  });

  cardElement.querySelector('.elements__vector').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__vector_active');
  });

  initialCards.forEach(function (element) {
    cardTitle.textContent = cardNameInput.value;
    cardImage.src = cardUrlInput.value;

    cardsContainer.prepend(cardElement);
  });

    const deleteButton = document.querySelector('.elements__trash');

    deleteButton.addEventListener('click', function () {
    const card = deleteButton.closest('.elements__element');
    card.remove();
  });
}






