import logo from '../../images/logo-header.svg'

function Header() {
    return (
        <header className='header'>
                <img className='header__logo' alt="Логотип" src={logo}></img>
                <div className="header__buttons">
                    <button className="header__button">Регистрация</button>
                    <button className="header__button header__button_place_landing">Войти</button>
                </div>
        </header>
    );
}

export default Header;