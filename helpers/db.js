import firestore from '@react-native-firebase/firestore';

export const getUser = async (uid) => {
    console.log('getUser', uid);
};

export const createUser = async (data) => {
    console.log('createUser', data);
    const { desiredJobTitle, email, firstName, lastName, yearsExperience, uid } = data;
    const response = await firestore().collection('users').add({
        desiredJobTitle,
        email,
        firstName,
        lastName,
        yearsExperience,
        uid
    });
    console.log('response', response);
};

export const updateUser = async (uid, data) => {
    console.log('updateUser', {uid, data});
};
