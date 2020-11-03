import { SIGN_IN, SIGN_OUT } from '../actions/types'

const INITIAL_STATE = {
    isSignedIn : null,
    verified: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type){
        case SIGN_IN:
            if (process.env.REACT_APP_VERIFIED_EMAIL.indexOf(action.payload) > -1 ){
                return { ...state, isSignedIn: true, verified : true }
            }
            return { ...state, isSignedIn: true, verified : false }
        case SIGN_OUT:
            return { ...state, isSignedIn: false, verified : false }
        default:
            return state
    }
}