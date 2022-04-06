import React, { useState } from 'react'

import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isSelectedCard, setIsSelectedCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeleteCardClick() {
    setIsDeleteCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsSelectedCard(false);
  }

  function handleCardClick(card) {
    setIsSelectedCard(true);
    setSelectedCard(card);
  }


  return (
    <div className="App">
      <body className="page">
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onEditAvatarClick={handleEditAvatarClick}
          onAddPlaceClick={handleAddPlaceClick}
          onDeleteClick={handleDeleteCardClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm name="edit" title="Edit profile"
          isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input id="name-input" type="text" name="profileName" placeholder="Name" autocomplete="off"
            className="popup__input popup__input_field_name" minlength="2" maxlength="40" required />
          <span className="popup__input-error name-input-error"></span>
          <input id="about-input" type="text" name="profileAbout" placeholder="About me" autocomplete="off"
            className="popup__input popup__input_field_about-me" minlength="2" maxlength="200" required />
          <span className="popup__input-error about-input-error"></span>
        </PopupWithForm>

        <PopupWithForm name="add" title="New place"
          isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input id="title-input" type="text" name="placeTitle" placeholder="Title" autocomplete="off"
            className="popup__input popup__input_field_title" minlength="1" maxlength="30" required />
          <span className="popup__input-error title-input-error"></span>
          <input id="link-input" type="url" name="placeLink" placeholder="Image link" autocomplete="off"
            className="popup__input popup__input_field_link" required />
          <span className="popup__input-error link-input-error"></span>
        </PopupWithForm>

        <PopupWithForm name="edit-photo" title="Change profile picture"
          isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input id="avaLink-input" type="url" name="avatarLink" placeholder="Avatar link" autocomplete="off"
            className="popup__input popup__input_field_link" required />
          <span className="popup__input-error avaLink-input-error"></span>
        </PopupWithForm>

        <PopupWithForm name="delete" title="Are you sure?"
          onClose={closeAllPopups} isOpen={isDeleteCardPopupOpen} />


        <ImagePopup card={selectedCard} isOpen={isSelectedCard} onClose={closeAllPopups} />

      </body>
    </div>

  );
}

export default App;
