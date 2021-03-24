import React from 'react';
import Authorization from "../Authorization/Authorization";
import FormElement from "../FormElement/FormElement";

function Register() {
    const [isName, setName] = React.useState('');
    const [isEmail, setEmail] = React.useState('');
    const [isPassword, setPassword] = React.useState('');

    return (
        <>
            <Authorization titleText="Добро пожаловать!" submitButtonText="Зарегистрироваться" enterQuestionText="Уже зарегистрированы?" enterButtonText="Войти" link="/signin">
                <FormElement title="Имя" 
                setInputValue={setName} 
                value={isName} 
                minLength='2' 
                maxLength='30' 
                required />
                <FormElement title="E-mail" 
                setInputValue={setEmail} 
                value={isEmail} 
                minLength='2' 
                maxLength='30' 
                pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,})\b" 
                required />
                <FormElement title="Пароль" 
                setInputValue={setPassword} 
                value={isPassword} 
                minLength='2' 
                maxLength='30' 
                required />
            </Authorization>
        </>
    )
}

export default Register;