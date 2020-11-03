import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData, selectCategory, changeCurrentPage, checkedData } from '../actions';
import { paginate, makeDataset } from './utils';
import Pagination from './common/Pagination';

import Table from './common/Table';
import TableTop from './common/TableTop';
import SideContent from './cardTemplate/SideContent';

import history from '../history';
import _ from 'lodash'

const NavOrderPage = () => {
    const { data, productData, checkedId } = useSelector(state => state.data);
    const { page } = useSelector(state => state)

    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchData('order'))
    }, [dispatch]);    

    const onClickRow = useCallback(row => {
        dispatch(checkedData(row));
    },[dispatch])

    const onClickAddUser = useCallback((e) => {
        e.preventDefault();
        history.push('/order/form/order-new');
    }, [])

    const onClickCategory = useCallback((category) => {
        dispatch(changeCurrentPage(1))
        dispatch(selectCategory(category));
    },[dispatch])

    const onClickCurrentPage = useCallback(page => {
        dispatch(changeCurrentPage(page))
    },[dispatch])

    const onClickButtonSelect = useCallback((id) => {
        history.push(`/order/select/${id}`)
    },[])

    

    const { dataset, totalPage } = useMemo(() => {
        const { sortColumn, filterColumn, pagination } = page;
        const { currentPage, pageSize } = pagination;

        if(data.length === 0){
            return { dataset: [], columns: [], totalPage: 0};
        }
        const titles = data[0] || [];
        const labels = data[1];
        const showColumns = ['check_box', 'status', 'timestamp' ,'name' ,'phone' ,'date' ,'startTime', 'totalTime' ,'totalPrice' ,'send']
        const index = titles.indexOf(sortColumn.title)
        
        let filtered = filterColumn !== 'all' 
            ? data.filter(item => item[2] === filterColumn )
            : data.slice(2) // 첫뻔째, 두번째 행은 제외 (컬럼 name과 label)

        filtered = filtered.length === 0 ? [{value : ''}] : filtered

        const currentData = paginate(filtered, currentPage, pageSize)
        const sorted = _.orderBy(currentData, [index], [sortColumn.order])
        const dataset = makeDataset(sorted, titles, labels, showColumns)

        return { dataset: dataset, totalPage: sorted.length};
    }, [data, page])
    if(data.length === 0 ){
        return <div>로딩중...</div>
    }

    return(
        <React.Fragment>
        <div>
            <TableTop 
                    filterColumn={page.filterColumn}
                    pagepath='orderPage'
                    categoryList={['발송완료', '발송전', 'all']}
                    onClickCategory={onClickCategory}
                    onClickAddUser={onClickAddUser}
            />
        </div>
        <div className="ui grid container">
            <div className="sixteen wide tablet twelve wide computer column" style={{ paddingLeft: '0px'}}>

                <Table 
                    data={dataset}
                    onClickRow={onClickRow} 
                />

                <Pagination 
                    page={page}
                    totalPage={totalPage}
                    onClickCurrentPage={onClickCurrentPage}
                />
            </div>
            <div className="sixteen wide tablet four wide computer column" style={{ paddingRight: '0px'}}>
                <SideContent productData={productData} onClickButtonSelect={() => onClickButtonSelect(checkedId)}/>
            </div>
        </div>
        </React.Fragment>
            
    );
};

export default NavOrderPage;

