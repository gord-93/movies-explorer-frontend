import { NavLink } from "react-router-dom";

function Error() {
    return (
        <section className="error">
            <div className="error-container">
                <h4 className="error__code">404</h4>
                <p className="error__text">Страница не найдена</p>
                <NavLink className="error__button" to="/">Назад</NavLink>
            </div>
        </section>
    )
}

export default Error;