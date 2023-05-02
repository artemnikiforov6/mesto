const popupProfileOpenButton = document.querySelector('.profile__info-edit-button');
const popupAddButton = document.querySelector('.profile__info-add-button');
const popupEditForm = document.querySelector('.popup_edit-form');
const popupAddForm = document.querySelector('.popup_add-form');
const profileEditForm = popupEditForm.querySelector('.popup__submit-form');
const newPlaceAddForm = document.querySelector('.popup__newplace-form');
const nameInput = profileEditForm.querySelector('#popup__name');
const jobInput = profileEditForm.querySelector('#popup__about');
const profileName = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const popupEdiFormClose = document.querySelector('.popup__close_edit_form');
const popupAddFormClose = document.querySelector('.popup__close_add-form');
const popupImageCard = document.querySelector('.popup_image');
const cardsContainer = document.querySelector('.elements');
const templateCard = document.querySelector('#elements__element').content;
const allPopups = document.querySelectorAll('.popup');

// Функции ------------------------------------------------------

// Активирует лайк карточки
function likeUserCard(evt) {
  evt.target.classList.toggle('elements__vector_active');
}

// Удаление карточки
function deleteUserCard(evt) {
  const card = evt.target.closest('.elements__element');
  card.remove();
}

// Создает элемент новой карточки и возвращает его
function createCard(cardText, cardImgSrc) {
  const userCardTemplate = templateCard.cloneNode(true);
  const cardImageElement = userCardTemplate.querySelector('.elements__picture');
  const cardTitleElement = userCardTemplate.querySelector('.elements__title');
  const deleteButtonElement = userCardTemplate.querySelector('.elements__trash');

  cardTitleElement.textContent = cardText;
  cardImageElement.src = cardImgSrc;

  cardImageElement.addEventListener('click', function () {
    const popupImage = popupImageCard.querySelector('.popup__image-element');
    const popupImageTitle = popupImageCard.querySelector('.popup__image-title');

    popupImage.src = cardImageElement.src;
    popupImageTitle.textContent = cardTitleElement.textContent;

    openPopup(popupImageCard);
  });

  userCardTemplate.querySelector('.elements__vector').addEventListener('click', likeUserCard);

  deleteButtonElement.addEventListener('click', deleteUserCard);

  return userCardTemplate;
}

// Открывает попап
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

// Закрывает попап
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc)
}

//Функция закрытия по клавише ESC
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
  };
};

// Слушатель закрытия при нажатии на Overlay
allPopups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
  if (event.target === popup) {
    closePopup(popup);
  }
});
});

// Создание новой карточки из формы
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closePopup(popupEditForm);
}

// Создает карточки из массива карточек
function renderInitialCard(cards) {
  cards.reverse().forEach(card => {
    const userCard = createCard(card.name, card.link);
    addUserCardToCardContainer(userCard)
  })
}

// Добавляет карточку в контейнер
function addUserCardToCardContainer(userCard) {
  cardsContainer.prepend(userCard);
}

// Обработчик «отправки» формы создания новой карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const cardNameInput = popupAddForm.querySelector('#popup__name_place');
  const cardUrlInput = popupAddForm.querySelector('#popup__link_place');

  const userCardElement = createCard(cardNameInput.value, cardUrlInput.value);

  addUserCardToCardContainer(userCardElement)

  closePopup(popupAddForm);
  evt.target.reset();
  evt.submitter.classList.add('popup__button_disabled')
  evt.submitter.disabled = true;
};

// Инициализирует слушатели событий
function initialEventsListeners() {
  popupAddButton.addEventListener('click', () => {
    openPopup(popupAddForm);
  });


  popupAddFormClose.addEventListener('click', () => {
    closePopup(popupAddForm);
  });

  newPlaceAddForm.addEventListener('submit', handleAddFormSubmit);

//Следим за событием “submit” - «отправка»
  profileEditForm.addEventListener('submit', handleEditFormSubmit);

//Открываем форму редактирования профиля.
  popupProfileOpenButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupEditForm);
  });

  popupEdiFormClose.addEventListener('click', () => {
    closePopup(popupEditForm)
  });

  document.querySelector('.popup__image-close').addEventListener('click', () => {
    closePopup(popupImageCard)
  });
}

// Инициализация ------------------------------------------------------

renderInitialCard(initialCards);
initialEventsListeners();
