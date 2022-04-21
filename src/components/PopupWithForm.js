import React, { useEffect } from 'react';
import FormValidator from "../utils/FormValidator";

function PopupWithForm(props) {

  const validationConfig = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-btn",
    inactiveButtonClass: "popup__save-btn_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  };

  useEffect(() => {
    const formElement = document.querySelector(`.popup_${props.name}`);
    const validator = new FormValidator(validationConfig, formElement);

    validator.enableValidation();
  }, []);

  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={`register-${props.name}`}
          onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__save-btn" type="submit">{props.buttonText}</button>
        </form>
        <button className="popup__close-btn hover-btn" onClick={props.onClose} type="button"></button>
      </div>
    </div >
  )
}

export default PopupWithForm; 