function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <li className="card" key={props.card._id}>
      <div src=" " alt=" " className="card__img"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={handleClick}></div>
      <h2 className="card__title">{props.card.name}</h2>
      <button className="card__like-btn" type="button"></button>
      <p className="card__likes-amount">{props.card.likes.length}</p>
      <button className="card__delete-btn hover-btn"
        type="button" onClick={props.onDeleteClick}></button>
    </li>
  )

}

export default Card; 