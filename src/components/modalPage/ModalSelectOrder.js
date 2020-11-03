import React , { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initializeForm, fetchForm, updateData } from '../../actions';

import Modal from '../common/Modal';
import NavProductPage from '../NavProductPage';
import history from '../../history';

const ModalSelect = ({ match }) => {
    const { checkedId } = useSelector(state => state.data);
    const { inputs } = useSelector(state => state.form);
    const dispatch = useDispatch();
    const id = match.params.id

    useEffect(() => {
        if (id.indexOf('new') === -1 ){
            dispatch(fetchForm(id))
        }
    }, [dispatch, id])

    const onClickDismiss = () => {
        dispatch(initializeForm())
        history.goBack();
    }

    const renderTitle = () => {
        return (
            '통역가 변경하기'
        )
    }    

    const onClickUpdateData = () => {
        if (!checkedId){
            alert('통역사를 선택해주세요.')
            return
        }


        const newForm = { ...inputs, product_id: checkedId}
        const newUserRow = Object.values(newForm)
        dispatch(updateData(newUserRow))
        history.goBack();
        
    }
    
    const renderContent = () => {
        return <NavProductPage match={match}/>
    }
    
    const renderActions = () => {
        
        return(
            <React.Fragment>
                <button className="ui button" onClick={onClickDismiss}>닫기</button>
                <button className="ui button primary" onClick={() => onClickUpdateData()}>선택하기</button>
            </React.Fragment>
        )
    }

    return (
        <Modal 
            title={renderTitle()}
            content={renderContent()}
            actions={renderActions()}
            scrolling='scrolling'
            onDismiss={onClickDismiss}
        />
    );
};

export default ModalSelect;