export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validateForm = () => {
    const formErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
        switch (key) {
            case 'email':
                if (!formData.email) setFormErrors({ ...formErrors, email: 'Email is required' });
                if (!validateEmail(value)) setFormErrors({ ...formErrors, email: 'Email is invalid' });
            default:
                if (_.isNil(value)) setFormErrors({ ...formErrors, [field]: `${_.startField(field)} is required` });
        }
    });

    return formErrors;
}
