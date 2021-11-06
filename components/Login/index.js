import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getLoginMode } from '../../reducers/user';
import LoginForm from '../Forms/LoginForm';
import CreateUserForm from '../Forms/CreateUserForm';

const Login = (props) => {
    const { loginMode } = props;
    return (
        <>
        {loginMode && <LoginForm />}
        {!loginMode && <CreateUserForm />}
        </>
    );
}

const mapStateToProps = (state) => ({
    loginMode: getLoginMode(state)
});

export default connect(mapStateToProps)(Login);
