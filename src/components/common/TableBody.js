import React from 'react';
import { makeImgURL } from '../utils';
import { useSelector } from 'react-redux';
import history from '../../history';

const TableBody = ({ data, onClickRow }) => {
    const { checkedId } = useSelector(state => state.data);
    const rowKeys = Object.keys(data);
    const pathname = history.location.pathname ===  '/' ? 'product' : history.location.pathname
    const buttonCSS = (category) => {
        
        const categoryMap = {
            '신규': 'primary',
            '발송전': 'primary',
            '반려완료': 'yellow',
        }
        return categoryMap[category] || null
    }

    return rowKeys.map(rowKey => {
        const row = data[rowKey];
        return <tr key={rowKey} className="center aligned" >
            {row.map((item, i) => {
                const { key, label, value, display } = item;

                if (key === 'detail' ){
                    return (
                        <td 
                            key={key}
                            name={key}
                            style={{ display: display || '' }}
                            onClick={() =>  history.push(`${pathname}/detail/${rowKey}`) }
                        ><button className="ui fluid button">{label}</button></td>
                    )
                }

                

                // 알림톡 버튼
                else if (key === 'send'){
                    const category = row[2].value
                    return (
                        <td 
                            key={key}
                            name={key}
                            style={{ display: display || '' }}
                            onClick={() => history.push(`${pathname}/send/${rowKey}`) }
                        ><button className={`ui fluid ${buttonCSS(category)} button`}>
                            {category === '처리완료' ? '발송완료' : '발송하기'}
                        </button></td>
                    )
                }

                // 이미지 파일
                else if (key === 'file_main'){
                    const url = makeImgURL(row[i].value);

                    return (
                        <td 
                            key={key}
                            name={key}
                            style={{ display: display || '' }}
                            onClick={() => onClickRow(row)}
                        >
                            <img 
                                className="ui centered small image" 
                                src={url} 
                                alt="통역가 이미지" 
                                style={{ maxWidth: '100%', height: 'auto'}} />
                        </td>
                    )
                }

                // 체크박스
                else if (key === 'check_box'){
                    const checkBox = rowKey === checkedId ? true : ''
                    return (
                        <td 
                            key={key}
                            name={key}
                            style={{ display: display || '' }}
                            onClick={() => onClickRow(row)}
                        ><div className="ui checked checkbox">
                            <input type="checkbox" checked={checkBox} onChange={()=> onClickRow(row)} />
                            <label></label>
                        </div>
                        </td>
                    )
                }

                
                return (
                    <td 
                        key={key}
                        name={key}
                        style={{ display: display || '' }}
                        onClick={() => onClickRow(row)}
                    >{value}</td>

                )
                
            })}
        </tr>
    })
};

export default TableBody;

