import searchIcon from '../../images/search-icon.svg'

function SearchForm(props) {

    const handleShortMovieStatus = (e) => {
        if (e.target.checked) {
            props.setIsShortMovie(true);
        } else {
            props.setIsShortMovie(false);
        }
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        props.submitSearchForm();
    }

    const handleTextValue = (e) => {
        props.setInputText(e.target.value);
    }
    
    return (
        <section className="search-form">
            <div className="search-form__container">
                <div className="search-form__search-container">
                    <form className="search-form__form" onSubmit={handleSearchSubmit}>
                        <img className="search-form__icon" src={searchIcon} alt="Иконка лупы"></img>
                        <input className="search-form__text-input" type="text" placeholder="Фильм" required 
                        onChange={handleTextValue} value={props.inputText}></input>
                        <button type="submit" className="search-form__submit-button"></button>
                    </form>
                    <div className="search-form__checkbox-container">
                        <label className="search__checkbox-switch">
                            <input type="checkbox" className="search-form__checkbox-input" onChange={handleShortMovieStatus}></input>
                            <span className="search-form__checkbox-slider"></span>
                        </label>
                        <p className="search-form__checkbox-text">Короткометражки</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchForm;