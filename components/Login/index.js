import React from 'react';
import _ from 'lodash';
import LoginForm from '../Forms/LoginForm';
import { Center } from 'native-base';

const Login = (props) => {
    return (
        <Center pt="150">
            <LoginForm {...props} />
        </Center>
    );
}

export default Login;
