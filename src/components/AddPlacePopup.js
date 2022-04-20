import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export function AddPlacePopup(props) {

  const titleRef = useRef();
  const linkRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlaceSubmit({
      name: titleRef.current.value,
      link: linkRef.current.value
    })
  }

  return (
    <PopupWithForm
      name="add"
      title="New place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}>
      <input
        ref={titleRef}
        id="title-input"
        type="text"
        name="placeTitle"
        placeholder="Title"
        autoComplete="off"
        className="popup__input popup__input_field_title"
        minLength="1"
        maxLength="30"
        required />
      <span className="popup__input-error title-input-error"></span>
      <input
        ref={linkRef}
        id="link-input"
        type="url"
        name="placeLink"
        placeholder="Image link"
        autoComplete="off"
        className="popup__input popup__input_field_link"
        required />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  )
}