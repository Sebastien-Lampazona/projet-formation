/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import * as columns from 'src/pages/BeerList/columns';
import './styles.scss';

const MemoizedTable = React.memo(Table);
function BeerTable({
  data,
  perPage,
  page,
  onPageChange,
  onPerPageChange,
  loading,
  fetching,
  onChange,
  searchParams,
  onBeerDetail,
}) {

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const columnsList = [
    columns.checkbox(selectedRowKeys, setSelectedRowKeys),
    columns.name(searchParams, selectedRowKeys),
    {
      title: 'Tagline',
      dataIndex: 'tagline',
      key: 'tagline',
      ellipsis: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Tips',
      dataIndex: 'brewers_tips',
      key: 'brewers_tips',
      ellipsis: true,
    },
    columns.detailButton(onBeerDetail),
  ];

  const fetchingIcon = useMemo(() => (
    <span className="fetching-icon">
      {fetching ? '🍺 ' : null}
    </span>
  ), [fetching]);

  const pageSizeOption = useMemo(() => ['10', '20', '50', '100'], []);

  const pagination = useMemo(() => ({
    current: page,
    pageSize: perPage,
    showSizeChanger: true,
    pageSizeOptions: pageSizeOption,
    onChange: (newPage, pageSize) => {
      onPageChange?.(newPage);
      onPerPageChange?.(pageSize);
    },
    total: 325,
    showTotal: (total, range) => <>{range[0]}-{range[1]} {fetchingIcon}</>,
  }), [page, perPage, onPageChange, onPerPageChange, fetchingIcon]);

  const onTableChange = useCallback((pagination, filters) => onChange(pagination, Object.keys(filters).reduce((acc, current) => {
    if (filters[current]) {
      return { ...acc, [current]: filters[current] };
    }
    return acc;
  }, {})), [onChange]);

  return (
    <MemoizedTable
      dataSource={data}
      columns={columnsList}
      loading={loading}
      rowKey="id"
      pagination={pagination}
      onChange={onTableChange}
    />
  );
}

BeerTable.propTypes = {
  searchParams: PropTypes.instanceOf(URLSearchParams).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
    address: PropTypes.string,
  })),
  perPage: PropTypes.number,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
  onPerPageChange: PropTypes.func,
  loading: PropTypes.bool,
  fetching: PropTypes.bool,
  onChange: PropTypes.func,
  onBeerDetail: PropTypes.func,
};

BeerTable.defaultProps = {
  data: [],
  perPage: 10,
  page: 1,
  loading: false,
  fetching: false,
};

export default BeerTable;
