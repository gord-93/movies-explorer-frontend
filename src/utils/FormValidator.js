import React from 'react';
import { useCallback } from 'react'

export function useFormWithValidation() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest('input').checkValidity());
    }

    const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
    )

    return { values, handleChange, errors, isValid, resetForm, setIsValid };
}