/* eslint-disable react/no-unstable-nested-components */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';
import * as columns from 'src/pages/BeerList/columns';
import './styles.scss';

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
  const columnsList = [
    columns.name(searchParams),
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

  const fetchingIcon = (
    <span className="fetching-icon">
      {fetching ? '🍺 ' : null}
    </span>
  );

  return (
    <Table
      dataSource={data}
      columns={columnsList}
      loading={loading}
      rowKey="id"
      pagination={{
        current: page,
        pageSize: perPage,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '80'],
        onChange: (newPage, pageSize) => {
          onPageChange?.(newPage);
          onPerPageChange?.(pageSize);
        },
        total: 325,
        showTotal: (total, range) => <>{range[0]}-{range[1]} {fetchingIcon}</>,
      }}
      onChange={(pagination, filters) => onChange(pagination, Object.keys(filters).reduce((acc, current) => {
        if (filters[current]) {
          return { ...acc, [current]: filters[current] };
        }
        return acc;
      }, {}))}
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
