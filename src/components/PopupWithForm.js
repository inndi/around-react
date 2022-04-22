import React, { useEffect } from 'react';

function PopupWithForm(props) {

  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={`register-${props.name}`}
          onSubmit={props.onSubmit}>
          {props.children}
          <button className={`popup__save-btn ${!props.isValid ? 'popup__save-btn_disabled' : ''}`} type="submit">{props.buttonText}</button>
        </form>
        <button className="popup__close-btn hover-btn" onClick={props.onClose} type="button"></button>
      </div>
    </div >
  )
}

export default PopupWithForm; 