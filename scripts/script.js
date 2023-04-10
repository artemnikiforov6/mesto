const popupProfileOpenButton = document.querySelector('.profile__info-edit-button');
const popupAddButton = document.querySelector('.profile__info-add-button');
const popupEditForm = document.querySelector('.popup_edit-form');
const formElement = popupEditForm.querySelector('.popup__submit-form');
const newPlaceElement = document.querySelector('.popup__newplace-form');
const nameInput = formElement.querySelector('#popup__name');
const jobInput = formElement.querySelector('#popup__about');
const profileName = document.querySelector('.profile__info-title');
const profileSubtitle = document.querySelector('.profile__info-subtitle');
const popupAddForm = document.querySelector('.popup_add-form');
const popupEdiFormClose = document.querySelector('.popup__close_edit_form');
const popupAddFormClose = document.querySelector('.popup__close_add-form');
const popupImageCard = document.querySelector('.popup_image');
const cardsContainer = document.querySelector('.elements');
const templateCard = document.querySelector('#elements__element').content;

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
    popupImageTitle.textContent = cardImageElement.textContent;

    openPopup(popupImageCard);

    document.querySelector('.popup__image-close').addEventListener('click', () => {
      closePopup(popupImageCard)
    });
  });

  userCardTemplate.querySelector('.elements__vector').addEventListener('click', likeUserCard);

  deleteButtonElement.addEventListener('click', deleteUserCard);

  return userCardTemplate;
}

// Открывает попап
function openPopup(popup) {
  popup.classList.add('popup_opened')
}

// Закрывает попап
function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

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
}

// Инициализирует слушатели событий
function initialEventsListeners() {
  popupAddButton.addEventListener('click', () => {
    openPopup(popupAddForm)
  });

  popupAddFormClose.addEventListener('click', () => {
    closePopup(popupAddForm)
  });

  newPlaceElement.addEventListener('submit', handleAddFormSubmit);

//Следим за событием “submit” - «отправка»
  formElement.addEventListener('submit', handleEditFormSubmit);

//Открываем форму редактирования профиля.
  popupProfileOpenButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(popupEditForm)
  });

  popupEdiFormClose.addEventListener('click', () => {
    closePopup(popupEditForm)
  });
}

// Инициализация ------------------------------------------------------

renderInitialCard(initialCards);
initialEventsListeners();
