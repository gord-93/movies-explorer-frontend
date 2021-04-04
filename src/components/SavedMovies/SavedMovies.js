import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
    return (
        <section className="saved-movies">
            <SearchForm />
            <MoviesCardList filteredMovie={props.savedCards} deleteCard={props.deleteCard}/>
        </section>
    )
}

export default SavedMovies;