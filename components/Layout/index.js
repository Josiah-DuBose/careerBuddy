import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Center } from 'native-base';
import Loading from '../Loading';
import Login from '../Login';
import Dashboard from '../Dashboard';
import { getUser, actions, getUserLoading } from '../../reducers/user';
import AppBar from '../Toolbar';

const Layout = (props) => {
    const { user, loading } = props;
    return (
        <>
            {user && <AppBar />}
            {loading && (
                <Center flex={1} px="3">
                    <Loading />
                </Center>
            )}
            {!loading && (
                <Center flex={1} px="3">
                    {!user && <Login />}
                    {user && <Dashboard />}
                </Center>
            )}
        </>
    )
};

const mapStateToProps = (state) => ({
    user: getUser(state),
    loading: getUserLoading(state)
});

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
