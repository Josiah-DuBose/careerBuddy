import React, { useState } from 'react';
import _ from 'lodash';
import LoginForm from '../Forms/LoginForm';
import CreateUserForm from '../Forms/CreateUserForm';

const Login = () => {
    const [loginMode, setLoginMode] = useState(true);

    return (
        <>
        {loginMode && <LoginForm setLoginMode={setLoginMode} />}
        {!loginMode && <CreateUserForm setLoginMode={setLoginMode} />}
        </>
    );
}

export default Login;
