function ImagePopup(props) {

  return (
    <div className={`popup popup_card ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__card-container">
        <img src={props.card.link} alt={props.card.name} className="popup__card-img" />
        <h2 className="popup__card-title">{props.card.name}</h2>
        <button className="popup__close-btn hover-btn" onClick={props.onClose} type="button"></button>
      </div>
    </div>
  )

}

export default ImagePopup; 