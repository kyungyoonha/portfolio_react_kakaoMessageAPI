import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {fetchForm, changeFormInputs, updateData, initializeData } from '../actions';

import SideContent from './cardTemplate/SideContent';
import NavProductPage from './NavProductPage';

const NavOrderFormPage = ({ match }) => {
    const { productData } = useSelector(state => state.data );
    const { inputs } = useSelector(state => state.form);
    const dispatch = useDispatch();
    const id = match.params.id

    useEffect(() => {
        dispatch(fetchForm(id))
        dispatch(initializeData())
    }, [dispatch, id])

    const onChangeInput = e => {
        dispatch(changeFormInputs(e))
    }

    const onClickButtonSave = (e) => {
        e.preventDefault();
        
        // 통역가 선택시 form에 반영
        if( productData[0].value ){
            inputs.product_id.value = productData[0].value
        }
        // form에 통역가 값이 들어있는 경우 구글 시트에 새로운 데이터 삽입
        if (!inputs.product_id.value){
            alert('통역가를 선택해주세요.');
        }else{
            const newRow = Object.values(inputs).map(item => item.value)
            dispatch(updateData(newRow))
        }        
    }

    
    const renderTop = () => {
        return <h2>결제내역 추가하기</h2>        
    }
    if (!inputs){
        return null
    }

    const showColumns = ['state', 'timestamp', 'name', 'phone', 'data', 'startTime','totalTime', 'totalPrice']
    return(
        <React.Fragment>
            {renderTop()}
            <div className="ui grid container">
                <div className="sixteen wide column" style={{ paddingLeft: '0px'}}>
                <div className="ui segment">
                    <form className="ui form">
                        {Object.keys(inputs).map((key, i) => {
                            if(showColumns.indexOf(key) === -1 ) return null;
                            
                            return <div className="field" key={i}>
                                <label>{inputs[key].label}</label>
                                <input 
                                    type="text" 
                                    name={key} 
                                    value={inputs[key].value} 
                                    onChange={e => onChangeInput(e)} 
                                />
                            </div>
                        })}
                        
                    </form>
                    </div>
                </div>
                <div className="sixteen wide tablet twelve wide computer column" style={{ paddingLeft: '0px'}}>
                    <div className="ui segment">
                        <h2>통역가 선택</h2>
                        <NavProductPage match={match}/>
                    </div>
                
                </div>
                <div className="sixteen wide tablet four wide computer column" style={{ paddingRight: '0px'}}>
                    <SideContent productData={productData} name="선택하기" />
                </div> 

                <div className="sixteen wide column">
                <button className="ui fluid primary button" name="send" onClick={(e) => onClickButtonSave(e)}>저장하기</button>
                </div>
                    
            </div>
        </React.Fragment>
    )
}

export default NavOrderFormPage;