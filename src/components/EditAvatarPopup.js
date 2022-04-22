import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export function EditAvatarPopup(props) {
  const inputRef = useRef();
  const { handleChange, errors, isValid, resetForm } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }

  useEffect(() => {
    inputRef.current.value = '';
    resetForm();
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-photo"
      title="Change profile picture"
      isOpen={props.isOpen}
      isValid={isValid}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}>
      <input
        ref={inputRef}
        onChange={handleChange}
        id="avaLink-input"
        type="url"
        name="avatarLink"
        placeholder="Avatar link"
        autoComplete="off"
        className="popup__input popup__input_field_link"
        required />
      <div className="popup__error-container">
        <span className="popup__input-error avaLink-input-error">{errors.avatarLink}</span>
      </div>
    </PopupWithForm>
  )
}