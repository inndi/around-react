import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    })
  }


  return (
    <PopupWithForm name="edit"
      title="Edit profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}>
      <input
        id="name-input"
        type="text"
        value={name}
        name="profileName"
        placeholder="Name"
        onChange={handleNameChange}
        autoComplete="off"
        className="popup__input popup__input_field_name"
        minLength="2"
        maxLength="40"
        required />
      <span className="popup__input-error name-input-error"></span>
      <input
        id="about-input"
        type="text"
        name="profileAbout"
        value={description}
        placeholder="About me"
        onChange={handleDescriptionChange}
        autoComplete="off"
        className="popup__input popup__input_field_about-me"
        minLength="2"
        maxLength="200"
        required />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
  )
}