import searchIcon from '../../images/search-icon.svg'

function SearchForm() {
    return (
        <section className="search-form">
            <div className="search-form__container">
                <form className="search-form__form">
                    <img className="search-form__icon" src={searchIcon} alt="Иконка лупы"></img>
                    <input className="search-form__text-input" type="text" placeholder="Фильм"></input>
                    <button className="search-form__submit-button"></button>
                </form>
                <div className="search-form__checkbox-container">
                </div>
            </div>
        </section>
    )
}

export default SearchForm;