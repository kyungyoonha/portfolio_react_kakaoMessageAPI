import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sortData } from '../../actions';

const TableHeader = ({ data }) => {
    const row = Object.values(data)[0]
    
    const { sortColumn } = useSelector(state => state.page);
    const dispatch = useDispatch();

    const onClickSort = useCallback((title) => {
        dispatch(sortData(title));
    },[dispatch])

    const icon = (title) => {
        return sortColumn.title === title 
            ? ( sortColumn.order === 'asc' 
                ? <i className="sort up icon"></i>
                : <i className="sort down icon"></i>)
            : null
     }
    return (
        <tr>
            {row.map(item => {
                const key = item.key
                const label = item.label
                const display = item.display || ''
                return (
                    <th 
                        key={key}
                        style={{ display: display}} 
                        onClick={() => onClickSort(key)}
                    >{label}{icon(key)}</th>
                )
            })}
        </tr>
    );
};

export default React.memo(TableHeader);