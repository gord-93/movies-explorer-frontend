import MoviesCard from '../MoviesCard/MoviesCard';
import { Route, useLocation } from 'react-router';
import React from 'react';
import { WINDOW_WIDTH } from '../../utils/constants';

function MoviesCardList(props) {
    const location = useLocation().pathname;
    const [sliceNum, setSliceNum] = React.useState(0);
    const [addCards, setAddCards] = React.useState(0);

    React.useEffect(() => {
        if (WINDOW_WIDTH.LARGE) {
            setSliceNum(12);
            setAddCards(3);
        } else
        if (WINDOW_WIDTH.MEDIUM) {
            setSliceNum(8);
            setAddCards(2)
        } else
        if (WINDOW_WIDTH.SMALL) {
            setSliceNum(5);
            setAddCards(2);
        }
    }, [])

    window.onresize = () => {
        if (WINDOW_WIDTH.LARGE) {
            setAddCards(3)
        } else {
            setAddCards(2);
        }
    }

    return (
        <section className="movies-card-list">
            { props.filteredMovie.length === 0 ? <p className="movies-card-list__text-error">{props.textError}</p>
            :
            <div className="movies-card-list__cards">
                {location === '/movies' ? 
                props.filteredMovie.slice(0, sliceNum).map((card) => {
                    return (<MoviesCard card={card} key={card.movieId} likeStatus={props.likeStatus} createCard={props.createCard} saveMovie={props.saveMovie} 
                    deleteCard={props.deleteCard} clickInfoButton={props.clickInfoButton} liked={props.saveMovie.some((saveMovie) => saveMovie.movieId === card.movieId)}/>)
                })
                :
                props.filteredMovie.map((card) => {
                    return (<MoviesCard card={card} key={card.movieId} deleteCard={props.deleteCard} />)
                })}
            </div>}
            <Route exact path='/movies'>
                <button className="movies-card-list__button " disabled={sliceNum >= props.filteredMovie.length} type="button" onClick={() => {
                setSliceNum(sliceNum + addCards);
                }}>Ещё</button>
            </Route>
        </section>
    )
}

export default MoviesCardList;