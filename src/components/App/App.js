import React from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { mainApi } from '../../utils/MainApi';
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
import { MESSAGE, SHORT_MOVIE_DURATION } from '../../utils/constants';

function App() {
    const history = useHistory();
    const [currentUser, setCurrentUser] = React.useState({});
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isSidebar, setSidebar] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    const [saveMovie, setSaveMovie] = React.useState([]);
    const location = useLocation().pathname;
    const [isShortMovie, setIsShortMovie] = React.useState(false);
    const [isShortSavedMovies, setIsShortSavedMovies] = React.useState(false);
    const [inputTextSavedMovies, setInputTextSavedMovies] = React.useState('');
    const [inputText, setInputText] = React.useState('');
    const [notFoundText, setNotFoundText] = React.useState('');
    //-------------------------------------------------------------------------//

    React.useEffect(() => {
        const token = localStorage.getItem('jwt')
        if (token) {
            mainApi.getUserAttribute(token)
            .then((user) => {
                setIsLoggedIn(true);
                setCurrentUser(user);
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
                return movie.duration <= SHORT_MOVIE_DURATION && regex.test(movie.nameRU);
            } else {
                return regex.test(movie.nameRU);
            }
        })
    }

    const handleSearchFormSubmit = () => {
        getBeatFilmList(inputText, isShortMovie);
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

    const handleSearchSavedMovies = () => {
        getSavedMovies(inputTextSavedMovies, isShortSavedMovies);
    }

    const handleUpdateUser = (email, name) => {
        mainApi.updateUser(email, name)
            .then((user) => {
            setCurrentUser(user);
            })
            .catch((err) => console.log(err));
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
                    history.push('/movies');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleLogin = (email, password) => {
        mainApi.authorize(email, password)
        .then((data) => {
            console.log(data)
            if (data.token) {
                localStorage.setItem('jwt', data.token);
            }
            setMovies([]);
            setIsLoggedIn(true);
            setCurrentUser(data.user);
            console.log(data.user)
            history.push('/movies');
        })
        .catch((err) => console.log(err))
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        setInputTextSavedMovies('');
        setInputText('');
        localStorage.removeItem('jwt');
        localStorage.removeItem('movies');
        localStorage.removeItem('savedMovies');
        history.push('/')
    }

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
                    <Register handleSubmit={handleRegister}/>
                </Route>
                <Route exact path="/signin">
                    <Login handleSubmit={handleLogin}/>
                </Route>
                <ProtectedRoute path="/movies" 
                component={Movies} 
                loggedIn={isLoggedIn} 
                loading={loading}
                createCard={handleCreateCard}
                setIsShortMovie={setIsShortMovie}
                inputText={inputText}
                setInputText={setInputText}
                notFoundText={notFoundText}
                filteredMovie={movies}
                submitSearchForm={handleSearchFormSubmit}
                isShortMovie={isShortMovie}
                saveMovie={saveMovie}
                deleteCard={handleDeleteCard}
                />
                <ProtectedRoute path="/saved-movies" 
                component={SavedMovies} 
                loggedIn={isLoggedIn} 
                savedCards={saveMovie} 
                deleteCard={handleDeleteCard}
                setIsShortMovie={setIsShortSavedMovies}
                inputText={inputTextSavedMovies}
                setInputText={setInputTextSavedMovies}
                submitSearchForm={handleSearchSavedMovies}
                isShortMovie={isShortSavedMovies}
                notFoundText={notFoundText}
                loading={loading}
                />
                <ProtectedRoute path="/profile" 
                component={Profile} 
                loggedIn={isLoggedIn} 
                logout={handleLogout} 
                updateUser={handleUpdateUser}
                />
                <Route exact path="/error">
                    <Error />
                </Route>
            </Switch>
            <Footer />
            <Sidebar setSidebar={setSidebar} isSidebar={isSidebar} />
        </div>
        </CurrentUserContext.Provider>
    )
}


export default App;