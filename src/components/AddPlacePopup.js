import React, { useRef, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

export function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const nameRef = useRef();
  const linkRef = useRef();

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
    nameRef.current.value = '';
    linkRef.current.value = '';
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
        ref={nameRef}
        onChange={handleNameChange}
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
        ref={linkRef}
        onChange={handleLinkChange}
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