import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Api } from "../utils/api";
import Card from "./Card";

function Main(props) {

  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();

  useEffect(() => {
    Api.getMyProfile()
      .then((profile) => {
        setUserName(profile.name);
        setUserDescription(profile.about);
        setUserAvatar(profile.avatar);
      })
  }, []);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    Api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
  }, []);

  return (
    <main className="main-content">
      <section className="profile">
        <img alt="photo of profile" className="profile__photo"
          style={{ backgroundImage: `url(${userAvatar})` }} />
        <button
          className="profile__edit-avatar-btn"
          type="button"
          onClick={props.onEditAvatarClick}>
        </button>
        <div className="profile__name-box">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-btn hover-btn"
            type="button"
            onClick={props.onEditProfileClick}>
          </button>
        </div>
        <p className="profile__about-me">{userDescription}</p>
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
              card={card}
              onCardClick={props.onCardClick}
            />
          )
          )}
        </ul>
      </section>
    </main>
  )
}

export default Main; 