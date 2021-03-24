import React from "react";

function FormElement({title, setInputValue, ...props}) {
    const [validationError, setValidationError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    function handleValidate(evt) {
        setInputValue(evt.target.value);
        if (!evt.target.validity.valid) {
            setValidationError(true);
            setErrorMessage(evt.target.validationMessage);
        } else {
            setValidationError(false);
            setErrorMessage('');
        }
    }

    return (
        <>
            <p className="form-element__input-name">{title}</p>
            <input className={`form-element__input ${validationError && `form-element__input-error`}`} 
            {...props} onChange={handleValidate} />
            <span className={`form-element__input-error ${validationError && 'form-element__input-error_active'}`}>{errorMessage}</span>
        </>
    )
}

export default FormElement;