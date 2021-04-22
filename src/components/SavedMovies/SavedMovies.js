import React from 'react';
import { SHORT_DURATION } from '../../utils/constants';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
    const [isShortMovie, setIsShortMovie] = React.useState(false);
    const [inputText, setInputText] = React.useState('');

    const handleSearchSavedMovies = () => {
        props.getSavedMovies(inputText, isShortMovie);
    }

    return (
        <section className="saved-movies">
            <SearchForm setIsShortMovie={setIsShortMovie} inputText={inputText} setInputText={setInputText} submitSearchForm={handleSearchSavedMovies}/>
            {props.loading ? 
            <Preloader />
            :
            <MoviesCardList filteredMovie={
                isShortMovie ? 
                props.saveMovie.filter((movie) => movie.duration <= SHORT_DURATION)
                :
                props.saveMovie
            } deleteCard={props.deleteCard} textError={props.notFoundText}/>}
        </section>
    )
}

export default SavedMovies;