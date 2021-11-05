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
import { MaterialIcons } from "@expo/vector-icons";
import { validateForm } from '../../helpers/general';
import auth from '@react-native-firebase/auth';


const CreateUserForm = ({ setLoginMode }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        yearsExperience: '',
        desiredJobTitle: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const userDetails = () => {

    };

    const handleCreate = async () => {
        setLoading(true);
        setFormSubmitted(true);
        setFormErrors(validateForm(formData));

        if (_.isEmpty(formErrors)) {
            const { email, password } = formData;
            auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
            });
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
        yearsExperience: 'schedule',
        desiredJobTitle: 'work'
    };

    return (
        <>
            {loading && <Center><Loading message="Creating account..." /></Center>}
            {!loading && (
                <Stack
                    mt={3}
                    space={4}
                    w={{
                        base: "75%",
                        md: "25%",
                    }}
                >

                    <Center>
                        <Heading textAlign="center" mb="10">Create Account</Heading>
                    </Center>
                    {Object.keys(formData).map(field => (
                        <FormControl key={field} isInvalid={formSubmitted && formErrors?.field}>
                            <FormControl.Label>{_.startCase(field)}</FormControl.Label>
                            <Input
                                isInvalid={formSubmitted && formErrors?.field}
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
                                {formErrors?.field}
                            </FormControl.ErrorMessage>
                        </FormControl>
                    ))}
                    <Button onPress={handleCreate}>Create Account</Button>
                    <Center>
                        <Pressable onPress={() => setLoginMode(true)}>
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
                                        Current user? Click here to login
                                    </Text>
                                )
                            }}
                        </Pressable>
                    </Center>
                </Stack>
            )}
        </>
    );
}

export default CreateUserForm;
