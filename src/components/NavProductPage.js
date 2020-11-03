import React, { useEffect, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchData, selectCategory, changeCurrentPage, checkedData } from '../actions';
import history from '../history';
import Table from './common/Table';
import TableTop from './common/TableTop';
import Pagination from './common/Pagination';
import { paginate, makeDataset } from './utils';
import _ from 'lodash';


const NavProductPage = ({ match }) => {
    const { data } = useSelector(state => state.data);
    const { page } = useSelector(state => state)
    
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData('product')) 
        // setInterval(() => {
        //     dispatch(fetchData('product'))
        // }, 3000);
    }, [dispatch]);    

    
    const onClickRow = useCallback(row => {
        dispatch(checkedData(row));
    },[dispatch])

    const pagepath = match.params.id ? match.path.split('/')[1] : 'product';
    const categoryList = useMemo(() => 
        pagepath === 'product'
            ? ['처리완료', '반려완료', '신규', 'all'] 
            : ['all', '영어', '일본어', '프랑스어', '중국어', '독일어']
        ,[pagepath])

    
    const onClickAddUser = useCallback((e) => {
        e.preventDefault();
        history.push('/product/detail/product-new');
    },[])


    const onClickCategory = useCallback((category) => {
        dispatch(changeCurrentPage(1))
        dispatch(selectCategory(category));
    }, [dispatch])

    const onClickCurrentPage = useCallback(page => {
        dispatch(changeCurrentPage(page))
    }, [dispatch])

    const { dataset, totalPage } = useMemo(() => {
        const { sortColumn, filterColumn, pagination } = page;
        const { currentPage, pageSize } = pagination;

        if(data.length === 0){
            return { dataset: [], columns: [], totalPage: 0};
        }

        const titles = data[0];
        const labels = data[1];
        const showColumns = ['check_box', 'state', 'timestamp', 'file_main', 'name', 'phone', 'language', 'add5', 'add6', 'detail', 'send']

        const index = titles.indexOf(sortColumn.title)
        const condition = pagepath === 'product' 
            ? 'state' 
            : ( pagepath === 'order' ? 'language' : 'x')

        // 필터(카테고리 선택)
        let filtered = filterColumn !== 'all' 
            ? data.filter(item => item[titles.indexOf(condition)] === filterColumn )
            : data.slice(2) // 첫뻔째, 두번째 행은 제외 (컬럼 name과 label)

        filtered = filtered.length === 0 ? [{value : ''}] : filtered

        // 정렬
        const currentData = paginate(filtered, currentPage, pageSize)
        const sorted = _.orderBy(currentData, [index], [sortColumn.order])
        const dataset = makeDataset(sorted, titles, labels, showColumns)
        return { dataset: dataset, totalPage: filtered.length};

    }, [data, pagepath, page])

    if(data.length === 0 ){
        return <div>로딩중...</div>
    }


    return (
        <React.Fragment>
            <TableTop 
                filterColumn={page.filterColumn}
                pagepath={pagepath}
                categoryList={categoryList}
                onClickCategory={onClickCategory}
                onClickAddUser={onClickAddUser}
            />

            <Table
                data={dataset}
                onClickRow={onClickRow}
            />

            <Pagination 
                page={page}
                totalPage={totalPage}
                onClickCurrentPage={onClickCurrentPage}
            />

        </React.Fragment>
    )
}
    
export default NavProductPage;

