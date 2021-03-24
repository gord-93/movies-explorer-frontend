import searchIcon from '../../images/search-icon.svg'

function SearchForm() {
    return (
        <section className="search-form">
            <div className="search-form__container">
                <div className="search-form__search-container">
                    <form className="search-form__form">
                        <img className="search-form__icon" src={searchIcon} alt="Иконка лупы"></img>
                        <input className="search-form__text-input" type="text" placeholder="Фильм" required></input>
                        <button className="search-form__submit-button"></button>
                    </form>
                    <div className="search-form__checkbox-container">
                        <label className="search__checkbox-switch">
                            <input type="checkbox" className="search-form__checkbox-input"></input>
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