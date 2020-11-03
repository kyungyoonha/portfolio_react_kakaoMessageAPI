import { 
    SORT_DATA, 
    SELECTED_CATEGORY, 
    CHANGE_CURRENT_PAGE,
    INITIALIZE_PAGE,
} from './types';



export const sortData = (title) => async (dispatch, getState) => {
    
    // 기존 title 값과 클릭된 title 값이 같은경우 asc => desc
    // 다른경우 기본 asc
    const { title: prevTitle, order: prevOrder }  = getState().page.sortColumn
    const order = prevTitle === title ? ( prevOrder === 'asc' ? 'desc' : 'asc') : 'asc'
    dispatch({
        type: SORT_DATA,
        payload: {
            title: title,
            order: order
        }
    })
}

export const selectCategory = category => {
    return {
        type: SELECTED_CATEGORY,
        payload: category
    }
}

export const changeCurrentPage = page => {
    return {
        type: CHANGE_CURRENT_PAGE,
        payload: page
    }
}


export const initializePage = () => {
    return {
        type: INITIALIZE_PAGE
    }
}
