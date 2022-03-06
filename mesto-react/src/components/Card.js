import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }  

  return (
    <article className="element">
      <img src={props.card.link} onClick={handleClick} className="element__image" alt={props.card.name} />
      <button type="button" className="element__trash"></button>
      <div className="element__footer">
        <h2 className="element__title">{props.card.name}</h2>
        <div className='element__like-block'>
          <button type="button" className="element__like-button"></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;