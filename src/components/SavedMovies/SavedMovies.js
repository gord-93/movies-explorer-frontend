import React from 'react';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
    return (
        <section className="saved-movies">
            <SearchForm setIsShortMovie={props.setIsShortMovie} inputText={props.inputText} setInputText={props.setInputText} submitSearchForm={props.submitSearchForm}/>
            {props.loading ? 
            <Preloader />
            :
            <MoviesCardList filteredMovie={
                props.isShortMovie ? 
                props.savedCards.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION)
                :
                props.savedCards
            } deleteCard={props.deleteCard} textError={props.notFoundText}/>}
        </section>
    )
}

export default SavedMovies;