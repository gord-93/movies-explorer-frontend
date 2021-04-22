import React from "react";

function FormElement({title, error, ...props}) {

    return (
        <>
            <p className="form-element__input-name">{title}</p>
            <input className={`form-element__input ${error && `form-element__input-error`}`} {...props} />
            <span className={`form-element__input-error ${error && 'form-element__input-error_active'}`}>{error}</span>
        </>
    )
}

export default FormElement;