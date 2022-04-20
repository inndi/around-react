import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export function EditAvatarPopup(props) {

  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  useEffect(() => {
    inputRef.current.value = '';
  }, [props.onClose]);

  return (
    <PopupWithForm
      name="edit-photo"
      title="Change profile picture"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}>
      <input
        ref={inputRef}
        id="avaLink-input"
        type="url"
        name="avatarLink"
        placeholder="Avatar link"
        autoComplete="off"
        className="popup__input popup__input_field_link"
        required />
      <div className="popup__error-container">
        <span className="popup__input-error avaLink-input-error"></span>
      </div>
    </PopupWithForm>
  )
}