import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import React from 'react';

function Movies(props) {
    const [isShortMovie, setIsShortMovie] = React.useState(false);
    const [inputKey, setInputKey] = React.useState('');
    const [notFoundText, setNotFoundText] = React.useState('');
    const [filteredMovie, setFilteredMovie ] = React.useState([]);

    React.useEffect(() => {
        const regex = new RegExp(inputKey, 'gi');
        if (inputKey === '') {
            setNotFoundText('Введите название или ключевые слова в строку поиска, чтобы найти фильмы');
            setFilteredMovie([]);
        } else {
            setNotFoundText('Ничего не найдено');
            isShortMovie ? 
            setFilteredMovie(props.cards.filter((movie) => regex.test(movie.nameRU) && movie.duration <= 40))
            :
            setFilteredMovie(props.cards.filter((movie) => regex.test(movie.nameRU)))
        }
    }, [inputKey, props.cards, isShortMovie])

    return (
        <section className="movies">
            <SearchForm setIsShortMovie={setIsShortMovie} inputKey={inputKey} setInputKey={setInputKey}/>
            {props.loading ? <Preloader /> : <MoviesCardList filteredMovie={filteredMovie} likeStatus={props.likeStatus} textError={notFoundText} createCard={props.createCard}/>}
        </section>
    )
}

export default Movies;