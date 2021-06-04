export const updateState = (state, updatedElement) => {
    return { ...state, ...updatedElement}
}

export const validate = (value, input) => {
    let isValid = true;
    let message = '';

    if (!input.validation) {
        return { valid: isValid, message: message };
    }

    if (input.validation.required) {
        isValid = value.trim() !== '' && isValid;
        message = isValid ? '' : '*Field required';
        if (!isValid) return { valid: isValid, message: message };
    }
    if (input.validation.minLength) {
        isValid = value.length >= input.validation.minLength && isValid;
        message = isValid ? '' : `*Field should be at least ${input.validation.minLength} long`;
        if (!isValid) return { valid: isValid, message: message };
    }
    if (input.validation.maxLength) {
        isValid = value.length <= input.validation.maxLength && isValid;
        message = isValid ? '' : `*Field shouldn't be longer than ${input.validation.maxLength}`;
        if (!isValid) return { valid: isValid, message: message };
    }
    if (input.validation.isEmail) {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = isValid && emailRegex.test(value);
        message = isValid ? '' : `*Field is not a valid email`;
        if (!isValid) return { valid: isValid, message: message };
    }
    return { valid: isValid, message: message };
}