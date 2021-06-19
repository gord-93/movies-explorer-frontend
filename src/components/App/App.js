import React from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';
import { movieApi } from '../../utils/MovieApi';
import Error from '../Error/Error';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import Sidebar from '../Sidebar/Sidebar';
import { MESSAGE, SHORT_DURATION } from '../../utils/constants';
import CardPopup from '../CardPopup/CardPopup';

function App() {
    const history = useHistory();
    const location = useLocation().pathname;
    const [currentUser, setCurrentUser] = React.useState({
        name: '',
        email: ''
    });
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isSidebar, setSidebar] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    const [saveMovie, setSaveMovie] = React.useState([]);
    const [isShortSavedMovies, setIsShortSavedMovies] = React.useState(false);
    const [inputTextSavedMovies, setInputTextSavedMovies] = React.useState('');
    const [notFoundText, setNotFoundText] = React.useState('');
    const [errorText, setErrorText] = React.useState('');
    const [isError, setError] = React.useState(false);
    const [isLoginError, setIsLoginError] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    //-------------------------------------------------------------------------//

    React.useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (token) {
            mainApi.getUserAttribute(token)
            .then((res) => {
                setIsLoggedIn(true);
                setCurrentUser(res);
                if (location === '/') {
                    history.push('/movies');
                } else {
                    history.push(location)
                }
            })
            .catch((err) => console.log(err))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getBeatFilmList = (inputText, isShortMovie) => {
        if (inputText === '') {
            setNotFoundText(MESSAGE.ENTER_TEXT);
            setMovies([]);
            localStorage.setItem('movies', JSON.stringify([]));
            return;
        }
        setLoading(true);
        movieApi.getInitialMovies()
        .then((movies) => movies.filter((movie) => 
                    movie.country &&
                    movie.director &&
                    movie.duration &&
                    movie.year &&
                    movie.description &&
                    movie.image &&
                    movie.trailerLink &&
                    movie.id &&
                    movie.nameRU &&
                    movie.nameEN
                ).map(({
                    country,
                    director,
                    duration,
                    year,
                    description,
                    image,
                    trailerLink,
                    id,
                    nameRU,
                    nameEN
                }) => ({
                    country,
                    director,
                    duration,
                    year,
                    description,
                    thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
                    image: `https://api.nomoreparties.co${image.url}`,
                    trailer: trailerLink,
                    movieId: id,
                    nameRU,
                    nameEN
                })))
            .then((movies) => {
                const filteredMovies = filterMovies(movies, inputText, isShortMovie);
                setNotFoundText(MESSAGE.NOT_FOUND);
                setMovies(filteredMovies);
                localStorage.setItem('movies', JSON.stringify(filteredMovies));
            })
            .catch(() => setNotFoundText(MESSAGE.ERROR))
            .finally(() => setLoading(false))
    }

    const filterMovies = (movies, inputText, isShortMovie) => {
        const regex = new RegExp(inputText, 'gi');
        return movies.filter((movie) => {
            if (isShortMovie) {
                return movie.duration <= SHORT_DURATION && regex.test(movie.nameRU);
            } else {
                return regex.test(movie.nameRU);
            }
        })
    }

    const getSavedMovies = (inputText, isShortMovie) => {
        const movies = JSON.parse(localStorage.getItem('savedMovies'));
        if (inputText === '') {
            setSaveMovie(movies);
        } else {
            const filteredMovies = filterMovies(movies, inputText, isShortMovie);
            setNotFoundText(MESSAGE.NOT_FOUND);
            setSaveMovie(filteredMovies);
        }
    }

    const handleUpdateUser = (email, name) => {
        mainApi.updateUser(email, name)
            .then((user) => {
            setCurrentUser(user);
            })
            .catch((err) => {
                console.log(err);
                setError(true);
                setErrorText(err.message);
            });
    };

    const handleCreateCard = (movie) => {
        mainApi.createMovie(movie)
        .then((newMovies) => {
            setSaveMovie([...saveMovie, newMovies])
            localStorage.setItem('savedMovies', JSON.stringify([...saveMovie, newMovies]))
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleDeleteCard = (id) => {
        mainApi.deleteMovie(id)
        .then(() => {
            const newSavedCards = saveMovie.filter((currentCard) => currentCard._id !== id)
            setSaveMovie(newSavedCards)
        })
        .catch((res) => console.log(res))
    }

    React.useEffect(() => {
        setLoading(true);
        if (isLoggedIn) {
            mainApi.getLikedMovies()
            .then((movie) => {
                localStorage.setItem('savedMovies', JSON.stringify(movie));
                setSaveMovie(movie);
                setLoading(false);
            })
        }
        if (location === '/movies') {
            setNotFoundText(MESSAGE.ENTER_TEXT);
        } else 
        if (location === '/saved-movies') {
            setNotFoundText('');
        }
    }, [isLoggedIn, location])

    React.useEffect(() => {
        const localStorageMovies = JSON.parse(localStorage.getItem('movies'));
        if (isLoggedIn) {
            if (localStorageMovies) {
                setMovies(localStorageMovies);
            }
        }
    }, [isLoggedIn])

    // ------------------------------------------------------------------------------------------------- //

    function handleRegister(name, email, password) {
        mainApi.register(name, email, password)
            .then((res) => {
                if (res) {
                    handleLogin(email, password);
                    history.push('/signin');
                    setErrorText('');
                    setError(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setErrorText(err.message);
                setError(true);
            });
    }

    const handleLogin = (email, password) => {
        mainApi.authorize(email, password)
        .then((res) => {
            if (res.token) {
                localStorage.setItem('jwt', res.token);
            }
            setMovies([]);
            setIsLoggedIn(true);
            setCurrentUser(res.user);
            history.push('/movies');
            setErrorText('')
            setIsLoginError(false);
        })
        .catch((err) => {
            console.log(err);
            setErrorText(err.message);
            setIsLoginError(true);
        })
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('savedMovies');
        setCurrentUser({
            name: '',
            email: ''
        });
        history.push('/')
    }

    const handleCardClick = (card) => {
        setSelectedCard(card);
        document.addEventListener('keydown', handleEscClose);
    }

    const closeAllPopups = () => {
        setSelectedCard(false);
    }

    const handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            closeAllPopups();
        }
    }

    React.useEffect(() => {
        const handleOverlayClose = (evt) => {
            if (evt.target.classList.contains('card-popup')) {
                closeAllPopups();
            }
        }
        document.addEventListener('click', handleOverlayClose);
        return () => {
            document.removeEventListener('click', handleOverlayClose);
        }
    }, [])

//-----------------------------------------------------------------------------------------------//

    return (
        <CurrentUserContext.Provider value={currentUser}>
        <div className="app">
            <Header setSidebar={setSidebar} loggedIn={isLoggedIn}/>
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route exact path="/signup">
                    <Register handleSubmit={handleRegister} loggedIn={isLoggedIn} errorText={errorText} isError={isError} />
                </Route>
                <Route exact path="/signin">
                    <Login handleSubmit={handleLogin} loggedIn={isLoggedIn} errorText={errorText} isError={isLoginError} />
                </Route>
                <ProtectedRoute path="/movies" 
                component={Movies} 
                loggedIn={isLoggedIn} 
                loading={loading}
                createCard={handleCreateCard}
                notFoundText={notFoundText}
                filteredMovie={movies}
                saveMovie={saveMovie}
                deleteCard={handleDeleteCard}
                getMovies={getBeatFilmList}
                clickInfoButton={handleCardClick}
                />
                <ProtectedRoute path="/saved-movies" 
                component={SavedMovies} 
                loggedIn={isLoggedIn} 
                saveMovie={saveMovie} 
                deleteCard={handleDeleteCard}
                setIsShortMovie={setIsShortSavedMovies}
                inputText={inputTextSavedMovies}
                setInputText={setInputTextSavedMovies}
                getSavedMovies={getSavedMovies}
                isShortMovie={isShortSavedMovies}
                notFoundText={notFoundText}
                loading={loading}
                clickInfoButton={handleCardClick}
                />
                <ProtectedRoute path="/profile" 
                component={Profile} 
                loggedIn={isLoggedIn} 
                logout={handleLogout} 
                updateUser={handleUpdateUser}
                />
                <Route>
                    <Error />
                </Route>
            </Switch>
            <Footer />
            <Sidebar setSidebar={setSidebar} isSidebar={isSidebar} />
            <CardPopup card={selectedCard} closePopupButton={closeAllPopups} />
        </div>
        </CurrentUserContext.Provider>
    )
}


export default App;