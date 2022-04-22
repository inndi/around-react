import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
    resetForm();
  }, [currentUser, props.isOpen]);


  // function handleNameChange(e) {
  //   setName(e.target.value);
  //   handleChange(e);
  // }

  // function handleDescriptionChange(e) {
  //   setDescription(e.target.value);
  //   handleChange(e);
  // }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    })
  }

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation();
  console.log(values);


  return (
    <PopupWithForm name="edit"
      title="Edit profile"
      isOpen={props.isOpen}
      isValid={isValid}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      buttonText={props.buttonText}>
      <input
        id="name-input"
        type="text"
        name="profileName"
        placeholder="Name"
        onChange={handleChange}
        // value={name || ""}
        autoComplete="off"
        className="popup__input popup__input_field_name"
        minLength="2"
        maxLength="40"
        required />
      <div className="popup__error-container">
        <span className="popup__input-error name-input-error">{errors.profileName}</span>
      </div>
      <input
        id="about-input"
        type="text"
        name="profileAbout"
        placeholder="About me"
        onChange={handleChange}
        value={description || ""}
        autoComplete="off"
        className="popup__input popup__input_field_about-me"
        minLength="2"
        maxLength="200"
        required />
      <div className="popup__error-container">
        <span className="popup__input-error about-input-error">{errors.profileAbout}</span>
      </div>
    </PopupWithForm>
  )
}