import React, { useState, useEffect } from 'react'

import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { ConfirmationPopup } from "./ConfirmationPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isSelectedCard, setIsSelectedCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [buttonText, setButtonText] = useState('');

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

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }


    document.addEventListener('keydown', closeByEscape)

    return () => document.removeEventListener('keydown', closeByEscape)
  }, [])

  function handleCardClick(card) {
    setIsSelectedCard(true);
    setSelectedCard(card);
  }

  function handleUpdateUser(userInfo) {
    setButtonText('Saving...');
    api.patchProfileData(userInfo)
      .then((user) => {
        setCurrentUser(user);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function () {
        setButtonText('Save');
      });
  }

  function handleUpdateAvatar(fieldValue) {
    setButtonText('Saving...');
    api.patchAvatar(fieldValue)
      .then((user) => {
        setCurrentUser(user);

      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function () {
        setButtonText('Save');
      });
  }

  useEffect(() => {
    api.getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(user => user._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((currentCard) => currentCard._id === card._id ? newCard : currentCard));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(currentCard) {
    api.delete(currentCard._id)
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
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleAddPlaceSubmit(card) {
    setButtonText('Creating...');
    api.postNewCardData(card)
      .then((card) => {
        setCards([card, ...cards]);
      })
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function () {
        setButtonText('Create');
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
