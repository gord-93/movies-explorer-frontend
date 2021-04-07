import React from "react";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/FormValidator';

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const { values, handleChange, isValid, setIsValid, errors} = useFormWithValidation();
    const [editProfile, setEditProfile] = React.useState(false);

    React.useEffect(() => {
        values['name'] = currentUser.name;
        values['email'] = currentUser.email;
        setIsValid(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, setIsValid]);

    React.useEffect(() => {
        if (values['email'] === currentUser.email && values['name'] === currentUser.name) {
        setIsValid(false);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values, currentUser])

    const handleEditProfile = () => {
        setEditProfile(true)
    }

    const handleSubmitForm = () => {
        props.updateUser(values['email'], values['name']);
        values['name'] = currentUser.name;
        values['email'] = currentUser.email;
        setEditProfile(false);
    }

    return (
        <section className="profile">
            <h3 className="profile__title">Привет, {currentUser.name}</h3>
            {!editProfile ? 
            <>
            <div className="profile__user-container">
                <p className="profile__user-text">Имя</p>
                <p className="profile__user-text">{currentUser.name}</p>
            </div>
            <div className="profile__user-container">
                <p className="profile__user-text">Почта</p>
                <p className="profile__user-text">{currentUser.email}</p>
            </div>
            <button className="profile__button" type="button" onClick={handleEditProfile}>Редактировать</button>
            <NavLink className="profile__button profile__exit-button" to="signin" onClick={props.logout}>Выйти из аккаунта</NavLink>
            </>
            : 
            <> 
            <form className="profile__form" onSubmit={handleSubmitForm} noValidate>
            <div className="profile__user-container">
                <p className="profile__user-text">Имя</p>
                <input className='profile__input' name='name' value={ values['name'] } onChange={ handleChange }
                minLength='2' maxLength='30' required/>
            </div>
            <div className="profile__user-container">
                <p className="profile__user-text">Почта</p>
                <input className='profile__input' name='email' type='email' value={ values['email'] } onChange={ handleChange } 
                pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b" 
                required/>
            </div>
            <span className="profile__error">{(errors && errors['email'] !== '' && errors['email']) || (errors && errors['name'] !== '' && errors['name'])}</span>
            <button className={`profile__submit-button ${!isValid}`} type="submit" disabled={!isValid}>Сохранить</button>
            </form>
            </>
            }
        </section>
    )
}

export default Profile;