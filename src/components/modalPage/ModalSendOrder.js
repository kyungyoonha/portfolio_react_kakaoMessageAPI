import React, { useEffect }  from 'react';

import { useSelector, useDispatch } from 'react-redux';

import history from '../../history';
import Modal from '../common/Modal';
import SendTemplate from '../cardTemplate/SendTemplate';

import { initializeForm, fetchTemplate, fetchForm, sendKakaoMsg } from '../../actions';
import { replaceContent, numberOnly, numberFormat } from '../utils';


const ModalSendOrder = ({ match }) => {
    const { template } = useSelector(state => state.data);
    const { inputs, product } = useSelector(state=> state.form)
    const id = match.params.id
    const dispatch = useDispatch();
    
    
    useEffect(() => {
        dispatch(fetchTemplate());
        dispatch(fetchForm(id))
    }, [dispatch, id])



    const onClickSend = (sendObjList) => {
        
        let isTrue = window.confirm("동시에 발송하시겠습니까?");

        // 알림톡 발송
        if (isTrue){
            dispatch(sendKakaoMsg(sendObjList, inputs, 'done'))
        }else{
            alert('발송이 취소되었습니다.')
        }
    }

    const onDismiss = () => {
        dispatch(initializeForm())
        history.goBack();
    }

    const getPageData = () => {
        if (!template || !inputs || !product) return 
        
        const temp = template.filter(row => row[0] === '결제')[0]
        const kakaoSend = {
            buyer: {
                content: temp[3],
                sendObj: {
                    tempNum: temp[2],
                    name: inputs.name,     
                    phone: inputs.phone,     
                    add1: inputs.date,      
                    add2: inputs.startTime,  
                    add3: inputs.totalTime,  
                    add4: { ...inputs.totalPrice, value: numberFormat(inputs.totalPrice.value) + ' 원' }, 
                    add5: product.name,      
                }
            },
            productor: {
                content: temp[5],
                sendObj: {
                    tempNum: temp[4],
                    name: product.name, 
                    phone: product.phone, 
                    add1: inputs.date, 
                    add2: inputs.startTime,
                    add3: inputs.totalTime, 
                    add4: { ...inputs.totalPrice, value: numberFormat(inputs.totalPrice.value) + ' 원' }, 
                    add5: { label: '정산금액', value: numberFormat(numberOnly(inputs.totalPrice.value) * 0.787) + ' 원' }, //calculator()
                    add6: inputs.name, 
                    add7: inputs.phone, 
                }
            }
        }
        
        
        return kakaoSend
    }   
    
    
    const renderContent = () => {
        const sendData = getPageData()
        if (!sendData) return
        
        const { buyer, productor } = sendData;
        return (
            <div className="ui three column grid">
                <div className="column">
                    <SendTemplate 
                        title="구매자용 알림톡"
                        content={replaceContent(buyer)}
                        onClick={() => onClickSend([buyer.sendObj, productor.sendObj])}
                    />
                </div>
                <div className="column">
                <SendTemplate 
                        title="통역가용 알림톡"
                        content={replaceContent(productor)}
                        onClick={() => onClickSend([buyer.sendObj, productor.sendObj])}
                    />
                </div>
                <div className="column">
                    
                </div>
                
                
            </div>
        )
    }
    const renderActions = () => {
        return (
            <div>
                <button 
                    className="ui button" 
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