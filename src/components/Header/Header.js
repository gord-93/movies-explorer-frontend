import { Route, Switch } from 'react-router';
import logo from '../../images/logo-header.svg'
import Navigation from '../Navigation/Navigation';

function Header(props) {
    return (
        <Switch>
            <Route exact path="/">
                <header className="header">
                    <img className='header__logo' alt="Логотип" src={logo}></img>
                    <Navigation />
                </header>
            </Route>
            <Route exact path="/:route">
                <header className="header header_place_movies">
                    <img className='header__logo' alt="Логотип" src={logo}></img>
                    <Navigation setSidebar={props.setSidebar}/>
                </header>
            </Route>
        </Switch>
    );
}

export default Header;