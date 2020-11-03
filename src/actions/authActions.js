import { SIGN_IN, SIGN_OUT } from './types';

export const signIn = userEmail => {   
    return {
        type: SIGN_IN,
        payload: userEmail
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};