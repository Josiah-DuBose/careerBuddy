import React from 'react';
import {
    FlatList,
    Icon,
    Button,
} from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

const AppDrawer = () => {
    const options = [
        { icon: 'person', name: 'Dashboard', bg: 'cyan.400' },
    ];

    return (
        <FlatList height="100%" backgroundColor="grey.400"
            paddingTop="200"
            numColumns={1}
            data={options}
            renderItem={({ item }) => {
                return (
                    <Button
                        m={'8px'}
                        borderRadius="full"
                        bg={item.bg}
                        variant="solid"
                        p="3"
                        leftIcon={
                            <Icon color="white" name={item.icon} as={MaterialIcons} size="sm" />
                        }
                    >
                        {item?.name}
                    </Button>
                )
            }} />
    );
}

export default AppDrawer;
