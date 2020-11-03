import { FETCH_FORM, CHANGE_FORM_INPUTS, CHANGE_FORM_PRODUCT, INITIALIZE_FORM } from '../actions/types';

const INITIAL_STATE = {
    inputs: null,  
    product: null, // 구매한 상품(통역가)
}

export default (state=INITIAL_STATE, action) => {
    
    switch (action.type){
        
        case FETCH_FORM:
            return action.payload

        case CHANGE_FORM_INPUTS:
            // { inputs: { language: { label: '언어', value: '영어'} } ... }
            const { name, value } = action.payload
            return{
                ...state,
                inputs: {
                    ...state.inputs,
                    [name] : {
                        ...state.inputs[name],
                        value
                    }
                }
            }
        
        case CHANGE_FORM_PRODUCT:
            return {
                ...state,
                product: action.payload
            }
        case INITIALIZE_FORM:
            return INITIAL_STATE

        default:
            return state;
    }
}

