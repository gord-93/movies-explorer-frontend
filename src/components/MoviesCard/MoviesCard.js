import React from "react";
import { useLocation } from 'react-router-dom'

function MoviesCard(props) {
    const location = useLocation().pathname;
    const [isLike, setLike] = React.useState(props.liked);

    const handleLikeStatus = () => {
        if (isLike) {
            setLike(false);
            const cardId = props.saveMovie.find((movie) => movie.movieId === props.card.movieId)._id;
            props.deleteCard(cardId);
        } else {
            setLike(true);
            props.createCard(props.card);
        }
    }

    const handleRemoveCard = () => {
        props.deleteCard(props.card._id);
    }

    const calcTime = () => {
        if (props.card.duration < 60) {
            return `${props.card.duration} мин`
        } else if (props.card.duration > 60) {
            return `${Math.floor(props.card.duration / 60)} ч ${props.card.duration % 60} мин`
        } else if (props.card.duration % 60 === 0) {
            return `${props.card.duration / 60} ч`
        }
    }

    const handleOpenTrailer = () => {
        return window.open(props.card.trailer);
    }

    return (
        <div className="movies-card">
            <img className="movies-card__image" src={props.card.image} alt={props.card.nameRU} onClick={handleOpenTrailer}></img>
            <div className="movies-card__about-container">
                <div className="movies-card__text-container">
                    <p className="movies-card__title">{props.card.nameRU}</p>
                    <p className="movies-card__time">{calcTime()}</p>
                </div>
                { location === '/movies' ?
                    <button className={`movies-card__like-button ${isLike && `movies-card__like-button_active`}`} type="button"
                    onClick={handleLikeStatus}
                    ></button>
                    :
                    <button className="movies-card__like-button movies-card__like-button_place_saved-movies" type="button" onClick={handleRemoveCard}></button>
                }
            </div>
        </div>
    )
}

export default MoviesCard;
