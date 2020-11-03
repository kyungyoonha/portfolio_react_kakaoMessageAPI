import React from 'react';

const SendTemplate = ({ title, content, onClick }) => {
    return (
        <div className="ui card">
            <div className="center aligned content" style={{ backgroundColor: '#fae100'}}>
                <h3>{title}</h3>
            </div>
            <div className="scrolling content" style={{ height: '400px'}}>
                <pre><div dangerouslySetInnerHTML={{ __html: content }} /></pre>
            </div>
            <div className="content">
                <button 
                    className="ui fluid button" 
                    onClick={onClick} 
                >알림톡 보내기</button>
            </div>
        </div>
    );
};

export default SendTemplate;