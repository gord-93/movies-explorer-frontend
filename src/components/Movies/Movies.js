import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import React from 'react';
import { SHORT_DURATION } from '../../utils/constants';

function Movies(props) {
    const [isShortMovie, setIsShortMovie] = React.useState(false);
    const [inputText, setInputText] = React.useState('');

    const handleSearchFormSubmit = () => {
        props.getMovies(inputText, isShortMovie);
    }

    return (
        <section className="movies">
            <SearchForm setIsShortMovie={setIsShortMovie} inputText={props.inputText} setInputText={setInputText} submitSearchForm={handleSearchFormSubmit}/>
            {props.loading ? 
            <Preloader /> 
            :
            <MoviesCardList filteredMovie={
                isShortMovie ? 
                props.filteredMovie.filter((movie) => movie.duration <= SHORT_DURATION)
                :
                props.filteredMovie
            } 
            likeStatus={props.likeStatus} textError={props.notFoundText} createCard={props.createCard} saveMovie={props.saveMovie} 
            deleteCard={props.deleteCard} clickInfoButton={props.clickInfoButton} />}
        </section>
    )
}

export default Movies;