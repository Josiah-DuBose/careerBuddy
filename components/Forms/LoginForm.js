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
    WarningOutlineIcon
} from 'native-base';
import _ from 'lodash';
import { MaterialIcons } from "@expo/vector-icons";
import { validateForm } from '../../helpers/general';
import auth from '@react-native-firebase/auth';

const LoginForm = ({ setLoginMode }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [formErrors, setFormErrors] = useState({ email: '', password: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleLogin = () => {
        setFormSubmitted(true);
        setFormErrors(validateForm(formData));
    };

    const textChange = (field, value) => {
        setFormErrors({ email: '', password: '' });
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
                <Heading textAlign="center" mb="10">Login</Heading>
            </Center>
            <FormControl isInvalid={formSubmitted && _.size(formErrors?.email)}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                    isInvalid={formSubmitted && _.size(formErrors?.email)}
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
            <FormControl isInvalid={formSubmitted && _.size(formErrors?.password)}>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                    isInvalid={formSubmitted && _.size(formErrors?.password)}
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
                <Text fontSize="lg">New user?</Text>
            </Center>
            <Button onPress={() => setLoginMode(false)}>Create Account</Button>
        </Stack>
    );
}

export default LoginForm;
