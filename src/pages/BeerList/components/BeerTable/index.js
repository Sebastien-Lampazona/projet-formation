import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Space, Table, Tag } from 'antd';

import * as columns from './columns';
import './styles.scss';

function BeerTable({ searchParams, beers, loading, onChange, page, pageSize, onBeerDetail }) {

    const columnsList = [
        columns.image(),
        columns.name(searchParams),
        columns.tagline(),
        columns.description(),
        columns.action(onBeerDetail),
    ];

    return (
        <Table
            columns={columnsList}
            dataSource={beers}
            loading={loading}
            rowKey="id"
            pagination={{
                total: 325,
                current: page,
                pageSize,
                pageSizeOptions: [10, 20, 50, 80],
            }}
            onChange={onChange}
        />
    );
}

BeerTable.propTypes = {
    beers: PropTypes.array,
    loading: PropTypes.bool,
    onChange: PropTypes.func,
    page: PropTypes.number,
    pageSize: PropTypes.number,
    searchParams: PropTypes.instanceOf(URLSearchParams).isRequired,
    onBeerDetail: PropTypes.func
}

BeerTable.defaultProps = {
    beers: [],
    page: 1,
    pageSize: 10,
    loading: false,
    onChange: () => {},
    onBeerDetail: () => {},
}

export default BeerTable;
