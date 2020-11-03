import React from 'react';

const SendTemplate = ({ title, content, sendObj, inputs, onChange, onClickTemp, onClickSend }) => {
    const renderInputs = () => {
        if (!inputs) return

        return (
            <form className="ui form">
                {inputs.map(item =>
                    
                    <div className="field" key={item}>
                        <label>{sendObj[item].label}</label>
                        <input 
                            name={item} 
                            type="text" 
                            value={sendObj[item].value || ''}
                            placeholder={`▶ ${sendObj[item].label}`}
                            autoComplete="off"
                            onChange={(e)=> onChange(e)}
                        />
                    </div>
                )}
            </form>
        )

    }

    const renderButton = () => {
        if (!inputs) return

        return (
            <div className="row" style={{ padding: '5px 0'}}>
                <button className="ui fluid button" onClick={onClickTemp} >임시저장</button>
            </div>
        )
    }
    


    return (
        <div className="ui card">
            <div className="center aligned content" style={{ backgroundColor: '#fae100'}}>
                <h3>{title}</h3>
            </div>
            <div className="scrolling content" style={{ height: '400px'}}>
                <pre><div dangerouslySetInnerHTML={{ __html: content }} /></pre>
                {renderInputs()}
            </div>
            <div className="content ui grid">
                {renderButton()}
                <div className="row" style={{ padding: '5px 0'}}>
                    <button className="ui fluid button" onClick={onClickSend} >알림톡 보내기</button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(SendTemplate);