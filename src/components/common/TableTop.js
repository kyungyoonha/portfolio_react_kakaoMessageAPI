import React from 'react';


const TableTop = ({ filterColumn, pagepath, categoryList, onClickCategory, onClickAddUser }) => {

    const renderAddButton = () => {
        if (pagepath === 'product'){
            return (
                <div className="ui basic button" onClick={e => onClickAddUser(e)}>
                    <i className="plus circle icon"></i>
                    통역가 추가하기
                </div>
            )
        }

        else if ( pagepath === 'orderPage'){
            return (
                <div className="ui basic button" onClick={e => onClickAddUser(e)}>
                    <i className="plus circle icon"></i>
                    결제정보 추가
                </div>
            )
        }
    }

    const categoryButton = () => {
        if (!categoryList) return null;
        const float = pagepath !== 'order' ? 'right floated' : ''
        return(
            categoryList.map((category, i) => 
                <button
                    key={i}
                    className={`ui basic button ${float} ${filterColumn === category ? 'active primary' : ''}`} 
                    onClick={() => onClickCategory(category)}
                >{category}
                </button>
            )
        )
    }

    return (
        <div>
            <br/>
            {renderAddButton()}
            {categoryButton()}
        </div>
    )
}

export default React.memo(TableTop);
