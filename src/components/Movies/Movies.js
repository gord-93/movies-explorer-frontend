import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import React from 'react';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';

function Movies(props) {
    return (
        <section className="movies">
            <SearchForm setIsShortMovie={props.setIsShortMovie} inputText={props.inputText} setInputText={props.setInputText} submitSearchForm={props.submitSearchForm}/>
            {props.loading ? 
            <Preloader /> 
            :
            <MoviesCardList filteredMovie={
                props.isShortMovie ? 
                props.filteredMovie.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION)
                :
                props.filteredMovie
            } 
            likeStatus={props.likeStatus} textError={props.notFoundText} createCard={props.createCard} saveMovie={props.saveMovie} deleteCard={props.deleteCard}/>}
        </section>
    )
}

export default Movies;