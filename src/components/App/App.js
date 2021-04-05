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

function App() {
    const history = useHistory();
    const [currentUser, setCurrentUser] = React.useState({});
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [isSidebar, setSidebar] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [movies, setMovies] = React.useState([]);
    const [saveMovie, setSaveMovie] = React.useState([]);
    const location = useLocation().pathname;

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

    const getBeatFilmList = () => {
        const localMovies = localStorage.getItem('movies');
        if (localMovies) {
            setMovies(JSON.parse(localMovies));
        } else {
            movieApi.getInitialMovies()
            .then((movies) => {
                const filterMovies = movies.filter((movie) => 
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
                }))
                setMovies(filterMovies);
                localStorage.setItem('movies', JSON.stringify(filterMovies));
            })
            .catch((err) => console.log(err))
        }
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
            setSaveMovie([newMovies, ...saveMovie])
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleDeleteCard = (movie) => {
        mainApi.deleteMovie(movie._id)
        .then(() => {
            const newSavedCards = saveMovie.filter((currentCard) => currentCard._id !== movie._id)
            setSaveMovie(newSavedCards)
        })
        .catch((res) => console.log(res))
    }

    React.useEffect(() => {
        if (isLoggedIn) {
            setLoading(true);
            getBeatFilmList();
            setLoading(false);
        }
    }, [isLoggedIn])

    React.useEffect(() => {
        if (isLoggedIn) {
            mainApi.getLikedMovies()
            .then((res) => {
                localStorage.setItem('savedMovies', JSON.stringify(res));
                setSaveMovie(res);
            })
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
            setIsLoggedIn(true);
            setCurrentUser(data.user);
            console.log(data.user)
            history.push('/movies');
        })
        .catch((err) => console.log(err))
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('jwt');
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
                cards={movies} 
                createCard={handleCreateCard}
                />
                <ProtectedRoute path="/saved-movies" 
                component={SavedMovies} 
                loggedIn={isLoggedIn} 
                savedCards={saveMovie} 
                deleteCard={handleDeleteCard}
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