import React, { useEffect } from 'react';
import Modal from '../common/Modal';
import history from '../../history';
import { useSelector, useDispatch } from 'react-redux';
import { fetchForm, changeFormInputs, initializeForm, updateData } from '../../actions';
import { makeImgURL } from '../utils'; 

const ModalDetail = ({ match }) => {
    
    const { inputs } = useSelector(state => state.form);
    const dispatch = useDispatch();
    const id = match.params.id

    useEffect(() => {
        dispatch(fetchForm(id))
    }, [dispatch, id])


    const renderTitle = () => {
        return '상세정보';
    }

    const onChangeInput = (e) => {
        dispatch(changeFormInputs(e))
    }
    
    const onClickDismiss = () => {
        dispatch(initializeForm())
        history.goBack();
    }

    const onClickUpdateData = () => {
        
        const newUserRow = Object.values(inputs).map(item => item.value)
        dispatch(updateData(newUserRow))
        
    }

    const renderContent = () => {
        const hideColumn = ['row_id', 'check_box', 'file_main', 'agree_1', 'agree_2', 'detail', 'send']
        
        
        if (!inputs) return null;
        return(
            <React.Fragment>
                
                <div>
                    { id.indexOf('new') === -1 
                        ? <img className="ui centered small image" src={makeImgURL(inputs['file_main'].value)} alt="" /> 
                        : null
                    }
                </div>
                <form className="ui form">
                    {Object.keys(inputs).map((key, i) => {
                        if(hideColumn.indexOf(key) !== -1 ) return null;
                        
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
            </React.Fragment>
            
        )
        
    }

    const renderActions = () => {
        return(
            <React.Fragment>
                <button className="ui button" onClick={onClickDismiss}>닫기</button>
                <button className="ui button primary" onClick={onClickUpdateData}>저장</button>
            </React.Fragment>
        )
    }

    return(
        <Modal 
            title={renderTitle()}
            content={renderContent()}
            actions={renderActions()}
            scrolling='scrolling'
            onDismiss={onClickDismiss}
        />
    )
}

export default ModalDetail;