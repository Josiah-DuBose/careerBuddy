import React from 'react';
import _ from 'lodash';
import CreateUserForm from '../Forms/CreateUserForm';
import { Center } from 'native-base';

const CreateUser = (props) => {
    return (
        <Center pt="50">
            <CreateUserForm {...props} />
        </Center>
    );
}

export default CreateUser;
