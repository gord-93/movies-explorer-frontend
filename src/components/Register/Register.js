import React from 'react';
import { Redirect } from 'react-router';
import { useFormWithValidation } from '../../utils/FormValidator';
import Authorization from "../Authorization/Authorization";
import FormElement from "../FormElement/FormElement";

function Register(props) {
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    const handleSubmit = (evt) => {
        evt.preventDefault();
        props.handleSubmit(values['name'], values['email'], values['password']);
        resetForm();
    }

    return (
        <>
            {props.loggedIn ?
            <Redirect to='/movies'/> 
            :
            <Authorization titleText="Добро пожаловать!" submitButtonText="Зарегистрироваться" enterQuestionText="Уже зарегистрированы?" enterButtonText="Войти" link="/signin"
            handleSubmit={handleSubmit} isValid={isValid} errorText={props.errorText} isError={props.isError} placeName={'register'}>
                <FormElement 
                title="Имя"
                name='name'
                type='text'
                error={errors['name']}
                onChange = {handleChange}
                minLength='2'
                maxLength='30'
                required
                />
                <FormElement 
                title="E-mail"
                name='email'
                type='email'
                error={errors['email']}
                onChange = {handleChange}
                minLength='2' 
                maxLength='30' 
                pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b" 
                required 
                />
                <FormElement 
                title="Пароль"
                name='password'
                error={errors['password']}
                onChange = {handleChange}
                type="password"
                minLength='8'
                required 
                />
            </Authorization>
            }
        </>
    )
}

export default Register;