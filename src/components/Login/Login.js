import React from "react";
import Authorization from "../Authorization/Authorization";
import FormElement from "../FormElement/FormElement";

function Login() {
    const [isEmail, setEmail] = React.useState('');
    const [isPassword, setPassword] = React.useState('');

    return (
        <>
            <Authorization titleText="Рады видеть!" submitButtonText="Войти" enterQuestionText="Ещё не зарегистрированы?" enterButtonText="Регистрация" placeName="login" link="/signup">
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

export default Login;