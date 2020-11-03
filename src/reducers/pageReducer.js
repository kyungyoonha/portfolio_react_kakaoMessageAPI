import { 
    SORT_DATA, 
    SELECTED_CATEGORY, 
    CHANGE_CURRENT_PAGE,
    INITIALIZE_PAGE,
} from '../actions/types';

const INITIAL_STATE = {
    filterColumn : 'all',
    pagination: { currentPage: 1, pageSize: 10 },
    sortColumn: { title: 'state', order: 'asc' },
    checkedList : [],

}

export default (state=INITIAL_STATE, action) => {
    switch (action.type){
        case SORT_DATA:
            return{
                ...state,
                sortColumn: action.payload
            }
        
        case SELECTED_CATEGORY:
            return {
                ...state,
                filterColumn: action.payload
            }
        
        case CHANGE_CURRENT_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.payload
                }
            }

        case INITIALIZE_PAGE:
            return INITIAL_STATE;
        
        default:
            return state
    };
};