import React from 'react';
import {
    Button,
    ScrollView,
    Flex,
    Center,
    Heading,
    VStack
} from 'native-base';
import auth from '@react-native-firebase/auth';

const Home = () => {
    const handleLogOut = () => {
        auth().signOut();
    };

    return (
        <ScrollView>
            <Center mt="20">
                <VStack space={2.5} w="100%">
                    <Flex
                        dir="row"
                        mb="2.5"
                        mt="1.5"
                        _text={{
                            color: "coolGray.800",
                        }}
                    >
                        <Heading>Dashboard</Heading>
                        <Center>
                            <Button onPress={handleLogOut}>Log Out</Button>
                        </Center>
                    </Flex>
                </VStack>
            </Center>
        </ScrollView>
    );
}

export default Home;
