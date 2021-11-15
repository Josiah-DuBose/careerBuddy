import React from 'react';
import {
    Icon,
    VStack,
    Pressable,
    Divider,
    Box,
    HStack,
    Text,
    Button,
    Center
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MaterialIcons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';

import { actions as userActions, getUser } from '../../reducers/user';
import { actions as generalActions, getIndex, getRouteNames } from '../../reducers/general';

import Login from '../Login';
import CreateUser from '../CreateUser';
import Dashboard from '../Dashboard';
import { updateUser } from '../../helpers/db';

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
    switch (screenName) {
        case 'Dashboard':
            return 'person';
        default:
            return undefined;
    }
};

const DrawerContent = (props) => {
    const { user, routeNames } = props;

    const handleLogout = async () => {
        await auth().signOut();
        updateUser(null);
        props.navigation.navigate('Login');
    };

    return (
        <DrawerContentScrollView {...props}>
            <VStack justifyContent='space-between' space='6' my='2' mx='1'>
                <Box px='4'>
                    <Text bold color='gray.700'>
                        {`Welcome ${user?.firstName} ${user?.lastName}!`}
                    </Text>
                </Box>
                {user && (
                    <VStack divider={<Divider />} space='4'>
                        <VStack space='3'>
                            {routeNames.map((name, index) => (
                                <Pressable
                                    key={name}
                                    px='5'
                                    py='3'
                                    rounded='md'
                                    bg={
                                        index === props.index
                                            ? 'rgba(6, 182, 212, 0.1)'
                                            : 'transparent'
                                    }
                                    onPress={(event) => {
                                        props.navigation.navigate(name);
                                    }}>
                                    <HStack space='7' alignItems='center'>
                                        <Icon
                                            color={
                                                index === props.index ? 'primary.500' : 'gray.500'
                                            }
                                            size='5'
                                            as={<MaterialIcons name={getIcon(name)} />}
                                        />
                                        <Text
                                            fontWeight='500'
                                            color={
                                                index === props.index ? 'primary.500' : 'gray.700'
                                            }>
                                            {name}
                                        </Text>
                                    </HStack>
                                </Pressable>
                            ))}
                        </VStack>
                    </VStack>
                )}
            </VStack>
            <VStack mt={525} safeAreaBottom>
                {!user && (
                    <Center>
                        <Button w={170} onPress={() => props.navigation.navigate('Login')}>
                            Login
                        </Button>
                        <Button w={170}
                            onPress={() => props.navigation.navigate('CreateUser')}>
                            Create Account
                        </Button>
                    </Center>
                )}
                {user && (
                    <Center>
                        <Button w={170} onPress={handleLogout}>Logout</Button>
                    </Center>
                )}
            </VStack>
        </DrawerContentScrollView>
    );
}

const AppDrawer = (props) => {
    const { user, routeNames, index } = props;
    return (
        <Box flex={1}>
            <Drawer.Navigator
                initialRouteName={user ? 'Dashboard' : 'Login'}
                drawerContent={(props) => <DrawerContent user={user} routeNames={routeNames} index={index} {...props} />}>
                <Drawer.Screen
                    name='Login'
                    component={Login}
                    options={({ navigation }) => ({ header: () => null })}
                />
                <Drawer.Screen
                    name='CreateUser'
                    component={CreateUser}
                    options={({ navigation }) => ({ header: () => null })}
                />
                <Drawer.Screen name='Dashboard' component={Dashboard} />
            </Drawer.Navigator>
        </Box>
    );
}

const mapStateToProps = (state) => ({
    user: getUser(state),
    index: getIndex(state),
    routeNames: getRouteNames(state)
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(userActions, dispatch),
    ...bindActionCreators(generalActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDrawer);
