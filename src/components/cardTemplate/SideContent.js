import React from 'react';
import { makeImgURL } from '../utils';

const SideContent = ({ productData, onClickButtonSelect, name }) => {
    const keys = productData.map(item => item.key)
    // const row_id = productData[keys[0]]
    const header = [
        {title: 'file_main', label: '이미지'},
        {title: 'name', label: '통역가 이름'},
        {title: 'verbal_id', label: '버벌 아이디' },
        {title: 'phone', label: '연락처'},
        {title: 'language', label: '언어'},
        {title: 'price', label: '금액'}
    ]
    
    const bottom = () => {
        if (name === '선택하기'){
            return null
        }
        else{
            return (
                <div className="extra content">
                    <button 
                        className="ui fluid button" 
                        onClick={onClickButtonSelect}
                    >{name ? name : '변경하기'}</button>
                </div>
            )    
        }
    }
    

    return (
        
        <div className="ui card" style={{width: '100%'}}>
            <div className="center aligned content" > 
                <h3>통역가 정보</h3>
            </div>
            {header.map(item => {
                const value = keys.indexOf(item.title) !== -1 
                    ? productData[keys.indexOf(item.title)].value 
                    : ''
                if ( item.title === 'file_main'){
                    return (
                        <img 
                            key={item.title}
                            className="ui centered rounded image" 
                            src={makeImgURL(value)} 
                            alt="" 
                        /> 
                    )
                }else{
                    return (
                        <div key={item.title} className="content">
                            <div className="ui horizontal label">{item.label}</div>
                            {value}
                        </div>
                    )
                }
            })}
            {bottom()}
            
        </div>
    );
};

export default React.memo(SideContent);