import { NavLink } from "react-router-dom";

function Profile(props) {
    return (
        <section className="profile">
            <h3 className="profile__title">Привет, Иван!</h3>
            <div className="profile__user-container">
                <p className="profile__user-text">Имя</p>
                <p className="profile__user-text">Иван</p>
            </div>
            <div className="profile__user-container">
                <p className="profile__user-text">Почта</p>
                <p className="profile__user-text">pochta@yandex.ru</p>
            </div>
            <button className="profile__button">Редактировать</button>
            <NavLink className="profile__button profile__exit-button" to="signin">Выйти из аккаунта</NavLink>
        </section>
    )
}

export default Profile;