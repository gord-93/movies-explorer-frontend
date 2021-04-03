import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
    const [savedCards, setSavedCards] = React.useState([]);

    return (
        <section className="saved-movies">
            <SearchForm />
            <MoviesCardList cards={savedCards}/>
        </section>
    )
}

export default SavedMovies;