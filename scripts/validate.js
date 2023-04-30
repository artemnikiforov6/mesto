// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, elementsValidation) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id }`);
  inputElement.classList.add(elementsValidation.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, elementsValidation) => {
  const errorElement = formElement.querySelector(`#error-${inputElement.id }`);
  inputElement.classList.remove(elementsValidation.inputErrorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, elementsValidation) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, elementsValidation);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement, elementsValidation);
  }
};



const setEventListeners = (formElement, elementsValidation) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(elementsValidation.inputSelector));
  const buttonElement = formElement.querySelector(elementsValidation.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, elementsValidation);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement, elementsValidation);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, elementsValidation);
    });
  });
};

 // Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, elementsValidation) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(elementsValidation.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(elementsValidation.inactiveButtonClass);
  }
};


const enableValidation = (elementsValidation) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(elementsValidation.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, elementsValidation);
  });
};

// Вызовем функцию
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_invalid',
});
