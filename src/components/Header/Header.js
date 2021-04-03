import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo-header.svg'
import Navigation from '../Navigation/Navigation';

function Header(props) {
    return (
        <Switch>
            <Route exact path="/">
                <header className="header">
                    <NavLink to="/" className="header__logo-link"><img className='header__logo' alt="Логотип" src={logo}></img></NavLink>
                    <Navigation loggedIn={props.loggedIn} setSidebar={props.setSidebar}/>
                </header>
            </Route>
            <Route exact path="/:route">
                <header className="header header_place_movies">
                    <NavLink to="/" className="header__logo-link"><img className='header__logo' alt="Логотип" src={logo}></img></NavLink>
                    <Navigation setSidebar={props.setSidebar} loggedIn={props.loggedIn}/>
                </header>
            </Route>
        </Switch>
    );
}

export default Header;