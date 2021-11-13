import _ from 'lodash';

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validateForm = (formData) => {
    const formErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
        switch (key) {
            case 'email':
                if (!value) formErrors.email = 'Email is required';
                if (!validateEmail(value)) formErrors.email = 'Email is invalid';
            default:
                if (!value) formErrors[key] = `${_.startCase(key)} is required`;
        }
    });
    return formErrors;
}
