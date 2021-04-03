import { Route, Switch } from "react-router";
import { NavLink } from "react-router-dom";

function Navigation(props) {
    return (
        <div className="navigation">
            <Switch>
                {!props.loggedIn ?
                <>
                <Route exact path="/">
                    <ul className="navigation__buttons">
                        <li><NavLink className="navigation__button" to="/signup">Регистрация</NavLink></li>
                        <li><NavLink className="navigation__button navigation__button_place_landing" to="signin">Войти</NavLink></li>
                    </ul>
                </Route>
                <Route exact path="/:route">
                    <button className='navigation__burger-button' onClick={() => {props.setSidebar(true)}}/>
                    <ul className="navigation__buttons navigation__buttons__place_movies">
                        <li><NavLink className="navigation__button" to="/movies">Фильмы</NavLink></li>
                        <li><NavLink className="navigation__button" to="/saved-movies">Сохранённые фильмы</NavLink></li>
                        <li><NavLink className="navigation__button navigation__button_place_movies" to="/profile">Аккаунт</NavLink></li>
                    </ul>
                </Route>
                </>
                : 
                <>
                <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
                    <button className='navigation__burger-button' onClick={() => {props.setSidebar(true)}}/>
                    <ul className="navigation__buttons navigation__buttons__place_movies">
                        <li><NavLink className="navigation__button" to="/movies">Фильмы</NavLink></li>
                        <li><NavLink className="navigation__button" to="/saved-movies">Сохранённые фильмы</NavLink></li>
                        <li><NavLink className="navigation__button navigation__button_place_movies" to="/profile">Аккаунт</NavLink></li>
                    </ul>
                </Route>
                </>}
            </Switch>
        </div>
    )
}

export default Navigation;