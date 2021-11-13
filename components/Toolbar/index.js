import React from "react";
import { HStack, IconButton, Icon, Text, Box, StatusBar } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, getUser } from '../../reducers/user';

const AppBar = (props) => {
    const { profile, updateUser } = props;
    const handleLogOut = () => {
        auth().signOut();
        updateUser(null);
    };

    return (
        <>
            <StatusBar backgroundColor="cyan.400" barStyle="light-content" />
            <Box safeAreaTop backgroundColor="cyan.400" />
            <HStack bg='cyan.400' px="1" py="3" justifyContent='space-between' alignItems='center'>
                <HStack space="4" alignItems='center'>
                    <IconButton icon={<Icon size="sm" as={<MaterialIcons name='menu' />} color="white" />} />
                    <Text color="white" fontSize="20" fontWeight='bold'>Dashboard</Text>
                </HStack>
                <HStack space="2">
                    <IconButton
                        icon={<Icon as={<MaterialIcons name='logout' />} size='sm' color="white" />}
                        onPress={handleLogOut}
                    />
                </HStack>
            </HStack>

        </>
    )
}

const mapStateToProps = (state) => ({
    profile: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
