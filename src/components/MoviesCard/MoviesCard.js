import React from "react";
import { Route, Switch } from "react-router";

function MoviesCard(props) {
    const [isLike, setLike] = React.useState(false)

    function handleLikeStatus() {
        if (isLike) {
            setLike(false);
        } else {
            setLike(true);
        }
    }

    return (
        <div className="movies-card">
            <img className="movies-card__image" src={props.image} alt={props.name}></img>
            <div className="movies-card__about-container">
                <div className="movies-card__text-container">
                    <p className="movies-card__title">{props.name}</p>
                    <p className="movies-card__time">{props.time}</p>
                </div>
                <Switch>
                    <Route exact path="/movies">
                        <button className={`movies-card__like-button ${isLike && `movies-card__like-button_active`}`} type="button"
                        onClick={handleLikeStatus}></button>
                    </Route>
                    <Route exact path="/saved-movies">
                        <button className="movies-card__like-button movies-card__like-button_place_saved-movies" type="button"></button>
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default MoviesCard;
