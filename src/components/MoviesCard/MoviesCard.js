import React from "react";
import { Route, Switch } from "react-router";

function MoviesCard(props) {
    const [isLike, setLike] = React.useState(false)

    const handleLikeStatus = () => {
        if (isLike) {
            setLike(false);
            props.deleteCard(props.card);
        } else {
            setLike(true);
            props.createCard(props.card);
        }
    }

    const handleRemoveCard = () => {
        props.deleteCard(props.card);
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

    return (
        <div className="movies-card">
            <img className="movies-card__image" src={props.card.image} alt={props.card.nameRU}></img>
            <div className="movies-card__about-container">
                <div className="movies-card__text-container">
                    <p className="movies-card__title">{props.card.nameRU}</p>
                    <p className="movies-card__time">{calcTime()}</p>
                </div>
                <Switch>
                    <Route exact path="/movies">
                        <button className={`movies-card__like-button ${isLike && `movies-card__like-button_active`}`} type="button"
                        onClick={handleLikeStatus}></button>
                    </Route>
                    <Route exact path="/saved-movies">
                        <button className="movies-card__like-button movies-card__like-button_place_saved-movies" type="button" onClick={handleRemoveCard}></button>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default MoviesCard;
