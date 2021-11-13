import React from 'react';
import {
    ScrollView,
    Flex,
    Center,
    VStack
} from 'native-base';

const Dashboard = () => {
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
                    </Flex>
                </VStack>
            </Center>
        </ScrollView>
    );
}

export default Dashboard;
