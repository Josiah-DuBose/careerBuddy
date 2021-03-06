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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import auth from '@react-native-firebase/auth';
import { MaterialIcons } from "@expo/vector-icons";
import { validateForm } from '../../helpers/general';
import { actions as userActions, getLoginMode } from '../../reducers/user';
import { actions as generalActions } from '../../reducers/general';
import { createUser, getUser } from '../../helpers/db';


const CreateUserForm = (props) => {
    const { setLoginMode, updateUser } = props;
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        yearsExperience: '',
        desiredJobTitle: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleCreate = async () => {
        userLoading(true);
        setFormSubmitted(true);
        setFormErrors(validateForm(formData));

        if(_.isEmpty(formErrors)) {
            try {
                const response = await auth().createUserWithEmailAndPassword(formData?.email, formData?.password);
                const userData = response?.user.toJSON();
                await createUser({ ...userData, ...formData });

                const user = await getUser();
                updateUser(user);
            } catch (err) {
                const message = _.get(err, 'message');

                if (message.includes('[auth/email-already-in-use]')) {
                    setFormErrors({
                        ...formErrors,
                        email: 'This email address is already in use by another account.',
                    });
                }
            } finally {
                userLoading(false);
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

    const iconMap = {
        email: 'email',
        password: 'lock',
        firstName: 'person',
        lastName: 'person',
        desiredJobTitle: 'work',
        yearsExperience: 'schedule',
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
                <Heading textAlign="center" mb={_.isEmpty(formErrors) ? '3': '-2'}>
                    Create Account
                </Heading>
            </Center>
            {Object.keys(formData).map(field => (
                <FormControl key={field} isInvalid={formSubmitted && !!formErrors[field]}>
                    <FormControl.Label>{_.startCase(field)}</FormControl.Label>
                    <Input
                        isInvalid={formSubmitted && !!formErrors[field]}
                        size="lg"
                        placeholder={_.startCase(field)}
                        variant="outline"
                        onChangeText={(e) => textChange(field, e)}
                        type={field === 'password' ? 'password' : 'text'}
                        value={formData[field]}
                        InputLeftElement={
                            <Icon
                                as={<MaterialIcons name={iconMap[field]} />}
                                size={5}
                                ml="2"
                                color="muted.400"
                            />
                        }
                    />
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        {formErrors[field]}
                    </FormControl.ErrorMessage>
                </FormControl>
            ))}
            <Button onPress={handleCreate}>Create Account</Button>
            <Center>
                <Pressable onPress={() => props.navigation.navigate('Login')}>
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
                                color={isPressed ? 'cyan.700' : 'cyan.400' }
                            >
                                Current user? Click here to login
                            </Text>
                        )
                    }}
                </Pressable>
            </Center>
        </Stack>
    );
};

const mapStateToProps = (state) => ({
    login: getLoginMode(state),
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(userActions, dispatch),
    ...bindActionCreators(generalActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserForm);
