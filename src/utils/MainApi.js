class MainApi {
    constructor(options) {
        this._options = options;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}:${res.statusText}`);
    }

    getUserAttribute() {
        return fetch(this._options.baseUrl + '/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then((res) => this._checkResponse(res))
    }

    updateUser(email, name) {
        return fetch(this._options.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                email, 
                name
            }),
        })
        .then((res) => this._checkResponse(res))
    }

    getLikedMovies() {
        return fetch(this._options.baseUrl + '/movies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then((res) => this._checkResponse(res))
    }

    createMovie(movie) {
        return fetch(this._options.baseUrl + '/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: movie.image,
                trailer: movie.trailerLink || 'https://www.youtube.com',
                movieId: movie.movieId,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                thumbnail: movie.thumbnail,
            })
        })
        .then((res) => this._checkResponse(res))
    }

    deleteMovie(movieId) {
        return fetch(this._options.baseUrl + `/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then((res) => this._checkResponse(res))
    }
    
    register(name, email, password) {
        return fetch(this._options.baseUrl + '/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        .then((res) => this._checkResponse(res))
    }
    
    authorize(email, password) {
        return fetch(this._options.baseUrl + '/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res) => this._checkResponse(res))
    }
}

export const mainApi = new MainApi({
    baseUrl: 'https://lion.students.nomoreparties.space'
});