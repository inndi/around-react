import React, { useEffect, useState, useContext } from 'react';
import { Api } from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {

  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

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

  function handleCardDelete(card) {

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

  return (
    <main className="main-content">
      <section className="profile">
        <div className="profile__photo"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>
        <button
          className="profile__edit-avatar-btn"
          type="button"
          onClick={props.onEditAvatarClick}>
        </button>
        <div className="profile__name-box">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-btn hover-btn"
            type="button"
            onClick={props.onEditProfileClick}>
          </button>
        </div>
        <p className="profile__about-me">{currentUser.about}</p>
        <button
          className="profile__add-btn hover-btn"
          type="button"
          onClick={props.onAddPlaceClick}>
        </button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) =>
          (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onDeleteClick={props.onDeleteClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          )
          )}
        </ul>
      </section>
    </main>
  )
}

export default Main; 