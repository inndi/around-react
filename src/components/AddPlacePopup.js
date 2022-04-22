import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlaceSubmit({
      name,
      link
    })
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="New place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}>
      <input
        onChange={handleNameChange}
        value={name}
        id="title-input"
        type="text"
        name="placeTitle"
        placeholder="Title"
        autoComplete="off"
        className="popup__input popup__input_field_title"
        minLength="1"
        maxLength="30"
        required />
      <div className="popup__error-container">
        <span className="popup__input-error title-input-error"></span>
      </div>
      <input
        onChange={handleLinkChange}
        value={link}
        id="link-input"
        type="url"
        name="placeLink"
        placeholder="Image link"
        autoComplete="off"
        className="popup__input popup__input_field_link"
        required />
      <div className="popup__error-container">
        <span className="popup__input-error link-input-error"></span>
      </div>
    </PopupWithForm>
  )
}