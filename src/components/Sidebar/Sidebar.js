import { NavLink, useLocation } from 'react-router-dom';

function Sidebar(props) {
    const location = useLocation().pathname;

    return (
        <section className={`sidebar ${props.isSidebar && `sidebar_active`}`}>
            <div className="sidebar__container">
                <button className="sidebar__close-button" type="button" 
                onClick={() => {props.setSidebar(false)}} />
                <nav className="sidebar__nav-block">
                    <ul className="sidebar__links">
                        <li className="sidebar__element">
                            <NavLink className={`sidebar__link ${location === "/" && `sidebar__link_active`}`} onClick={() => {props.setSidebar(false)}}
                            to="/">Главная</NavLink>
                        </li>
                        <li className="sidebar__element">
                            <NavLink className={`sidebar__link ${location === "/movies" && `sidebar__link_active`}`} onClick={() => {props.setSidebar(false)}}
                            to="/movies">Фильмы</NavLink>
                        </li>
                        <li className="sidebar__element">
                            <NavLink className={`sidebar__link ${location === "/saved-movies" && `sidebar__link_active`}`} onClick={() => {props.setSidebar(false)}}
                            to="/saved-movies">Сохраненные фильмы</NavLink>
                        </li>
                        <li className="sidebar__element">
                            <NavLink className={`sidebar__link sidebar__link_profile ${location === "/profile" && `sidebar__link_active`}`} onClick={() => {props.setSidebar(false)}}
                            to="/profile">Аккаунт</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </section>
    )
}

export default Sidebar;