class MovieApi {
    constructor(options) {
        this._options = options;
    }
    
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    
    getInitialMovies() {
        return fetch (this._options.baseUrl, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => this._checkResponse(res));
    }
}

export const movieApi = new MovieApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
});
