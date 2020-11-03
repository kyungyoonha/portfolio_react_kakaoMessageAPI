import React, { useEffect }  from 'react';

import { useSelector, useDispatch } from 'react-redux';

import history from '../../history';
import Modal from '../common/Modal';
import SendTemplate from '../cardTemplate/SendTemplate';
import SendTemplateInputs from '../cardTemplate/SendTemplateInputs';

import { initializeForm, fetchTemplate, fetchForm, changeFormInputs, updateData, sendKakaoMsg } from '../../actions';
import { replaceContent } from '../utils';


const ModalSendOrder = ({ match }) => {
    const { template } = useSelector(state => state.data);
    const { inputs } = useSelector(state=> state.form)
    const id = match.params.id
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(fetchTemplate());
        dispatch(fetchForm(id))
    }, [dispatch, id])

    const onChange = e => {
        dispatch(changeFormInputs(e))
    }

    const onClickTemp = () => {
        const newUserRow = Object.values(inputs).map(item => item.value)
        dispatch(updateData(newUserRow))
    }

    const onClickSend = (sendObj, type) => {
        dispatch(sendKakaoMsg([sendObj], inputs, type))
    }

    const onDismiss = () => {
        dispatch(initializeForm())
        history.goBack();
    }

    const getPageData = () => {
        if (!template || !inputs ) return 
        
        const temp = template.filter(row => row[0] === '통역가')[0]
        const kakaoSend = {
            confirm: {
                content: temp[3],
                sendObj: {
                    tempNum: temp[2],
                    name: inputs.name,     
                    phone: inputs.phone,     
                }
            },
            reject: {
                content: temp[5],
                sendObj: {
                    tempNum: temp[4],
                    name: inputs.name, 
                    phone: inputs.phone, 
                    add1: inputs.add1, 
                    add2: inputs.add2,
                    add3: inputs.add3, 
                    add4: inputs.add4, 
                }
            },
            done: {
                content: temp[7],
                sendObj: {
                    tempNum: temp[6],
                    name: inputs.name, 
                    phone: inputs.phone, 
                    add5: inputs.add5, 
                    add6: inputs.add6,
                    add7: inputs.add7, 
                    add8: inputs.add8, 
                    add9: inputs.add9,
                    add10: inputs.add10, 
                }
            }
        }
        
        
        return kakaoSend
    }   
    
    
    const renderContent = () => {
        const sendData = getPageData()
        if (!sendData) return
        
        const { confirm, reject, done } = sendData;
        return (
            <div className="ui three column grid">
                <div className="column">
                    <SendTemplate 
                        title="신규"
                        content={replaceContent(confirm)}
                        onClick={() => onClickSend(confirm.sendObj, 'send')}
                    />
                </div>
                <div className="column">
                    <SendTemplateInputs 
                        title="반려 알림톡"
                        content={replaceContent(reject)}
                        sendObj={reject.sendObj}
                        inputs={['add1', 'add2', 'add3', 'add4']}
                        onChange={onChange}
                        onClickTemp={() => onClickTemp(reject.sendObj)}
                        onClickSend={() => onClickSend(reject.sendObj, 'reject')}
                    />
                </div>
                <div className="column">
                    <SendTemplateInputs 
                        title="등록완료"
                        content={replaceContent(done)}
                        sendObj={done.sendObj}
                        inputs={['add5', 'add6', 'add7', 'add8', 'add9', 'add10']}
                        onChange={onChange}
                        onClickTemp={() => onClickTemp(done.sendObj)}
                        onClickSend={() => onClickSend(done.sendObj, 'done')}
                    />
                </div>
                
                
            </div>
        )
    }
    const renderActions = () => {
        return (
            <div>
                <button 
                    className="ui fluid button" 
                    onClick={() => history.goBack()} 
                >닫기</button>
            </div>
        )
    }
    
    return (
        <Modal 
            title='구매정보 알림톡 보내기' 
            content={renderContent()} 
            actions={renderActions()} 
            scrolling='' 
            onDismiss={onDismiss}
        />
    );
};

export default ModalSendOrder;