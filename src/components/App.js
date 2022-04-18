import React, { useState, useEffect } from 'react'

import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { Api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isSelectedCard, setIsSelectedCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

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

  function handleUpdateUser(userInfo) {
    Api.patchProfileData(userInfo)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    Api.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main
            onEditProfileClick={handleEditProfileClick}
            onEditAvatarClick={handleEditAvatarClick}
            onAddPlaceClick={handleAddPlaceClick}
            onDeleteClick={handleDeleteCardClick}
            onCardClick={handleCardClick}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}>
          </EditProfilePopup>

          <PopupWithForm name="add" title="New place"
            isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
            buttonText='Create'>
            <input id="title-input" type="text" name="placeTitle" placeholder="Title" autoComplete="off"
              className="popup__input popup__input_field_title" minLength="1" maxLength="30" required />
            <span className="popup__input-error title-input-error"></span>
            <input id="link-input" type="url" name="placeLink" placeholder="Image link" autoComplete="off"
              className="popup__input popup__input_field_link" required />
            <span className="popup__input-error link-input-error"></span>
          </PopupWithForm>

          <PopupWithForm name="edit-photo" title="Change profile picture"
            isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
            buttonText='Save'>
            <input id="avaLink-input" type="url" name="avatarLink" placeholder="Avatar link" autoComplete="off"
              className="popup__input popup__input_field_link" required />
            <span className="popup__input-error avaLink-input-error"></span>
          </PopupWithForm>

          <PopupWithForm name="delete" title="Are you sure?"
            onClose={closeAllPopups} isOpen={isDeleteCardPopupOpen}
            buttonText='Yes' />


          <ImagePopup card={selectedCard} isOpen={isSelectedCard} onClose={closeAllPopups} />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
