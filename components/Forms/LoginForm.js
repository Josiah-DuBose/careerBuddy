import React, { useState } from 'react';
import {
    Text,
    Button,
    Input,
    Stack,
    Center,
    Heading,
    Icon,
    FormControl,
    WarningOutlineIcon,
    Pressable
} from 'native-base';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MaterialIcons } from "@expo/vector-icons";
import { validateForm } from '../../helpers/general';
import { getUser } from '../../helpers/db';
import { actions, getLoginMode } from '../../reducers/user';
import auth from '@react-native-firebase/auth';

const LoginForm = (props) => {
    const { setLoginMode, updateUser } = props;
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    console.log('formErrors', formErrors)

    const handleLogin = async () => {
        setFormSubmitted(true);
        setFormErrors(validateForm(formData));

        if(_.isEmpty(formErrors)) {
            try {
                const response = await auth().signInWithEmailAndPassword(formData?.email, formData?.password);
                console.log('response', response);
                const userData = response?.user.toJSON()
                console.log('userData', userData);
                const user = await getUser(userData?.uid);
                updateUser(user);
            } catch (err) {
                console.error('Error during login: ', err);
            }
        }
    };

    const textChange = (field, value) => {
        setFormErrors({});
        setFormData({
            ...formData,
            [field]: value
        });
    };

    return (
        <Stack
            mt={3}
            space={4}
            w={{
                base: "75%",
                md: "25%",
            }}
        >
            <Center>
                <Heading textAlign="center" mb="3">Login</Heading>
            </Center>
            <FormControl isInvalid={formSubmitted && formErrors?.email}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                    isInvalid={formSubmitted && formErrors?.email}
                    size="lg"
                    placeholder="Email"
                    variant="outline"
                    onChangeText={(e) => textChange('email', e)}
                    value={formData?.email}
                    InputLeftElement={
                        <Icon
                            as={<MaterialIcons name="email" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                        />
                    }
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {formErrors?.email}
                </FormControl.ErrorMessage>
            </FormControl>
            <FormControl isInvalid={formSubmitted && formErrors?.password}>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                    isInvalid={formSubmitted && formErrors?.password}
                    size="lg"
                    placeholder="Password"
                    variant="outline"
                    type="password"
                    onChangeText={(e) => textChange('password', e)}
                    value={formData?.password}
                    InputLeftElement={
                        <Icon
                            as={<MaterialIcons name="lock" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                        />
                    }
                />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {formErrors?.password}
                </FormControl.ErrorMessage>
            </FormControl>
            <Button onPress={handleLogin}>Login</Button>
            <Center>
                <Pressable onPress={() => setLoginMode(false)}>
                    {({ isPressed }) => {
                        return (
                            <Text
                                style={{
                                    transform: [
                                        {
                                            scale: isPressed ? 0.96 : 1,
                                        },
                                    ],
                                }}
                                fontSize="sm"
                                color={isPressed ? 'cyan.700' : 'cyan.400'}
                            >
                                New User? Click here to create account
                            </Text>
                        )
                    }}
                </Pressable>
            </Center>
        </Stack>
    );
}

const mapStateToProps = (state) => ({
    login: getLoginMode(state),
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
