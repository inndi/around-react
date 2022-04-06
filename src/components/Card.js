import React, { useEffect, useState } from 'react';
import { Api } from "../utils/api";

function Card() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
  }, []);

  return (
    <>
      {
        cards.map((card) =>
        (
          <li className="card" key={card._id}>
            <img src=" " alt=" " className="card__img"
              style={{ backgroundImage: `url(${card.link})` }} />
            <h2 className="card__title">{card.name}</h2>
            <button className="card__like-btn" type="button"></button>
            <p className="card__likes-amount">{card.likes.length}</p>
            <button className="card__delete-btn hover-btn" type="button"></button>
          </li>
        )
        )
      }
    </>
  )

}

export default Card; 