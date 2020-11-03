import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ data, onClickRow }) => {
    return (
        <table className="ui celled unstackable table">
            <thead>
                <TableHeader data={data} />
            </thead>

            <tbody style={{ fontSize: '0.9rem'}}>
                <TableBody data={data} onClickRow={onClickRow} />
            </tbody>
        </table>
    );
};

export default Table;