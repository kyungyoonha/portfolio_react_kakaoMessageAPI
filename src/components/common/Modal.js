import React from 'react';
import ReactDOM from 'react-dom';
//import history from '../history';

const Modal = ({ title, content, actions, scrolling, onDismiss }) => {
    return ReactDOM.createPortal(
        <div 
            onClick={() => onDismiss()} 
            className="ui dimmer modals visible active"
        >
            <div onClick={(event) => event.stopPropagation() }className="ui standard modal visible active">
                <div className="header">{title ? title : '뒤로가기'  }</div>
                <div className={`${scrolling} content`}>{content ? content : '-'}</div>
                <div className="actions">{actions}</div>
            </div>
        </div>,
        document.querySelector('#modal')
    );
};


export default Modal;
