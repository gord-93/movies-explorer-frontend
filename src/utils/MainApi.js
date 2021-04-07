const baseUrl = 'https://lion.students.nomoreparties.space';

    async function _checkResponse(res) {
        const response = await res.json();
        if (res.ok) {
            return response;
        }
        return Promise.reject(response);
    }

    export const getUserAttribute = () => {
        return fetch(baseUrl + '/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then((res) => _checkResponse(res))
    }

    export const updateUser = (email, name) => {
        return fetch(baseUrl + '/users/me', {
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
        .then((res) => _checkResponse(res))
    }

    export const getLikedMovies = () => {
        return fetch(baseUrl + '/movies', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then((res) => _checkResponse(res))
    }

    export const createMovie = (movie) => {
        return fetch(baseUrl + '/movies', {
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
        .then((res) => _checkResponse(res))
    }

    export const deleteMovie = (movieId) => {
        return fetch(baseUrl + `/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then((res) => _checkResponse(res))
    }
    
    export const register = (name, email, password) => {
        return fetch(baseUrl + '/signup', {
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
        .then((res) => _checkResponse(res))
    }
    
    export const authorize = (email, password) => {
        return fetch(baseUrl + '/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((res) => _checkResponse(res))
    }