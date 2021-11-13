import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getUser = async () => {
    const doc = await firestore().collection('users').doc(auth().currentUser.uid).get();
    return doc.data();
};

export const createUser = async (data) => {
    const { desiredJobTitle, email, firstName, lastName, yearsExperience, uid } = data;
    return firestore().collection('users').doc(uid).set({
        desiredJobTitle,
        email,
        firstName,
        lastName,
        yearsExperience,
    });
};

export const updateUser = async (uid, data) => {
    console.log('updateUser', {uid, data});
};
