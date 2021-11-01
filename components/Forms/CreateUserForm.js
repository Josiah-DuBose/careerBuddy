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


const CreateUserForm = ({ setLoginMode }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        yearsExperience: '',
    });
    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleCreate = () => {
        setFormSubmitted(true);
        setFormErrors(validateForm(formData));
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
        yearsExperience: 'work',
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
                <Heading textAlign="center" mb="10">Create Account</Heading>
            </Center>
            {Object.keys(formData).map(field => (
                <FormControl isInvalid={formSubmitted && formErrors?.field}>
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
                <Text fontSize="lg">Current user?</Text>
            </Center>
            <Button onPress={() => setLoginMode(true)}>Login</Button>
        </Stack>
    );
}

export default CreateUserForm;
