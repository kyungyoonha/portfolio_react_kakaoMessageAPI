import { 
    FETCH_DATA, 
    UPDATE_DATA, 
    FETCH_TEMPLATE, 
    INITIALIZE_DATA,
    CHECKED_DATA,
} from '../actions/types';

const INITIAL_STATE = {
    data: [],
    template: null,
    productData: [],
    checkedId: '',
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type){
        case FETCH_DATA:
            return {
                ...state,
                data: action.payload,
                productData: [],
                checkedId: ''
            };
        
        case UPDATE_DATA:
            return{
                ...state,
                data: action.payload,
            }

            
        case FETCH_TEMPLATE:
            
            return{
                ...state,
                template: action.payload
            }
        
        case CHECKED_DATA:
            return{
                ...state,
                productData: action.payload.productData,
                checkedId : action.payload.checkedId
            }
        
        case INITIALIZE_DATA:
            return INITIAL_STATE;
        
        default:
            return state
    };
};