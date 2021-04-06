import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../images/logo-header.svg'

function Authorization(props) {

    return(
        <section className="authorization">
            <div className="authorization__container">
                <img className="authorization__logo" src={logo} alt="Логотип"></img>
                <h2 className="authorization__title">{props.titleText}</h2>
                <form className="authorization__form" noValidate onSubmit={props.handleSubmit}>
                    {props.children}
                    <span className={`profile__error profile__error_place_${props.placeName}`}>{props.isError ? props.errorText : 'Успешно!'}</span>
                    <button className={`authorization__submit-button authorization__submit-button_place_${props.placeName}`} 
                    type="submit" disabled={!props.isValid}>{props.submitButtonText}</button>
                </form>
                <div className="authorization__enter-container">
                    <p className="authorization__enter-question">{props.enterQuestionText}</p>
                    <NavLink className="authorization__enter" to={props.link}>{props.enterButtonText}</NavLink>
                </div>
            </div>
        </section>
    )
};

export default Authorization;