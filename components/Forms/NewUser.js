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
import { MaterialIcons } from "@expo/vector-icons";
import { actions as userActions, getLoginMode } from '../../reducers/user';
import { actions as generalActions } from '../../reducers/general';
import { updateUserDB, getUser } from '../../helpers/db';


const NewUser = (props) => {
    const { setLoginMode, updateUser, addAlert } = props;
    const [formData, setFormData] = useState({});
    const [currentStep, setCurrentStep] = React.useState('firstName');

    const handleCreate = async () => {
        userLoading(true);
        try {
            await updateUserDB(formData);
            const user = await getUser();
            updateUser(user);
        } catch (err) {
            console.error('handleCreate Error: ', err);
        } finally {
            userLoading(false);
        }
    };

    const fieldOrder = [
        'firstName',
        'lastName',
        'desiredJobTitle',
        'yearsExperience',
    ];

    const textChange = (field, value) => {
        setFormData({
            ...formData,
            [field]: value
        });
    };

    const iconMap = {
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
            <FormControl key={currentStep}>
                <FormControl.Label>{_.startCase(currentStep)}</FormControl.Label>
                <Input
                    size="lg"
                    placeholder={_.startCase(currentStep)}
                    variant="outline"
                    onChangeText={(e) => textChange(currentStep, e)}
                    type='text'
                    value={formData[currentStep]}
                    InputLeftElement={
                        <Icon
                            as={<MaterialIcons name={iconMap[currentStep]} />}
                            size={5}
                            ml="2"
                            color="muted.400"
                        />
                    }
                />
            </FormControl>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
