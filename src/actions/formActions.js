import { FETCH_FORM, CHANGE_FORM_INPUTS, CHANGE_FORM_PRODUCT, INITIALIZE_FORM, } from './types';
import getSelectData from '../apis/getSelectData';

export const fetchForm = id => async dispatch => {
    const inputs = await getSelectData(id)
    
    // order => product_id 조회
    const product = inputs.product_id 
        ? await getSelectData(inputs.product_id.value)
        : ''
        
    dispatch({
        type: FETCH_FORM,
        payload: {
            inputs,
            product
        }
    })

}



export const changeFormInputs = (e) => {
    const { name, value } = e.target;
    return {
        type: CHANGE_FORM_INPUTS,
        payload:{
            name,
            value
        }
    }
}


export const changeFormProduct = id => async dispatch => {

    const product = await getSelectData(id)

    dispatch({
        type: CHANGE_FORM_PRODUCT,
        payload: product
    })
}


export const initializeForm = () => {
    return {
        type: INITIALIZE_FORM,
    }
}