import React, { useState, useEffect } from 'react'

import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { Api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { ConfirmationPopup } from "./ConfirmationPopup";

// import { FormValidator } from "../utils/FormValidator";

function App() {

  // const validationConfig = {
  //   formSelector: ".popup__form",
  //   inputSelector: ".popup__input",
  //   submitButtonSelector: ".popup__save-btn",
  //   inactiveButtonClass: "popup__save-btn_disabled",
  //   inputErrorClass: "popup__input_type_error",
  //   errorClass: "popup__input-error_active",
  // };

  // const formValidators = {};

  // const enableValidation = (config) => {
  //   const formList = Array.from(document.querySelectorAll(config.formSelector));
  //   formList.forEach((formElement) => {
  //     const validator = new FormValidator(config, formElement);
  //     const formName = formElement.getAttribute('name');

  //     formValidators[formName] = validator;
  //     validator.enableValidation();
  //   });
  // };

  // enableValidation(validationConfig);


  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isSelectedCard, setIsSelectedCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  const [buttonText, setButtonText] = useState('');
  // const [selectedInput, setSelectedInput] = useState();

  function handleEditProfileClick() {
    setButtonText('Save');
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setButtonText('Create');
    setIsAddPlacePopupOpen(true);
  }


  function handleEditAvatarClick() {
    setButtonText('Save');
    setIsEditAvatarPopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setSelectedCard(card);
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
    setButtonText('Saving...');
    Api.patchProfileData(userInfo)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(() => {
        closeAllPopups();
        setButtonText('Save');
      })
      .catch((err) => {
        console.log(err);
      });
  }



  function handleUpdateAvatar(fieldValue) {
    setButtonText('Saving...');
    Api.patchAvatar(fieldValue)
      .then((user) => {
        setCurrentUser(user);

      })
      .then(() => {
        closeAllPopups();
        setButtonText('Save');
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

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    Api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(currentCard) {
    Api.delete(currentCard._id)
      .then(() => {
        const newCards = cards.filter((card) => card._id !== currentCard._id);
        setCards(newCards);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    Api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleAddPlaceSubmit(card) {
    setButtonText('Creating...');
    Api.postNewCardData(card)
      .then((card) => {
        setCards([card, ...cards]);
      })
      .then(() => {
        closeAllPopups();
        setButtonText('Create');
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
            cards={cards}
            onCardLike={handleCardLike}
          />
          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            buttonText={buttonText} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlaceSubmit={handleAddPlaceSubmit}
            buttonText={buttonText} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            buttonText={buttonText}
          />

          <ConfirmationPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
            onCardDelete={handleCardDelete}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isSelectedCard}
            onClose={closeAllPopups} />

        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
