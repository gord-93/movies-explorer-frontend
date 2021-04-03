import React from "react";
import { useFormWithValidation } from "../../utils/FormValidator";
import Authorization from "../Authorization/Authorization";
import FormElement from "../FormElement/FormElement";

function Login(props) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleSubmit(values['email'], values['password']);
        resetForm();
    }

    return (
        <>
            <Authorization titleText="Рады видеть!" submitButtonText="Войти" enterQuestionText="Ещё не зарегистрированы?" enterButtonText="Регистрация" placeName="login" link="/signup"
            handleSubmit={handleSubmit} isValid={isValid}>
                <FormElement 
                title="E-mail"
                name='email'
                type='email'
                minLength='2'
                maxLength='30'
                pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b"
                required
                error={errors['email']}
                onChange={handleChange}
                />
                <FormElement 
                title="Пароль"
                name='password'
                type='password'
                minLength='2'
                maxLength='30'
                required
                error={errors['password']}
                onChange={handleChange}
                />
            </Authorization>
        </>
    )
}

export default Login;