import React from 'react'
import {
    Stack,
    Alert,
    IconButton,
    HStack,
    VStack,
    CloseIcon,
    Text,
} from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions, getAlerts } from '../../reducers/general';

const AlertProvider = (props) => {
    const { alerts } = props;
    return (
        <Stack space={3} w="100%">
            {alerts.map(({ status, message, show }) => {
                return (
                    <>
                        {show && (
                            <Alert w="100%" status={status} variant="left-accent">
                                <VStack space={2} flexShrink={1} w="100%">
                                    <HStack flexShrink={1} space={2} justifyContent="space-between">
                                        <HStack space={2} flexShrink={1}>
                                            <Alert.Icon mt="1" />
                                            <Text fontSize="md" color="coolGray.800">
                                                {message}
                                            </Text>
                                        </HStack>
                                        <IconButton
                                            variant="unstyled"
                                            icon={<CloseIcon size="3" color="coolGray.600" />}
                                        />
                                    </HStack>
                                </VStack>
                            </Alert>
                        )}
                    </>
                )
            })}
        </Stack>
    )
};

const mapStateToProps = (state) => ({
    alerts: getAlerts(state),
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertProvider);
