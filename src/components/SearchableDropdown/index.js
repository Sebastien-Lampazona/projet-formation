import React from 'react';
import { Input, Space, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const SearchableDropdown = React.forwardRef(({
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters,
  dataIndex,
  placeholder = null,
}, ref) => (
  <div style={{ padding: 8 }}>
    <Input
      ref={ref}
      placeholder={placeholder || dataIndex}
      value={selectedKeys[0]}
      onChange={(event) => setSelectedKeys(event.target.value ? [event.target.value] : [])}
      onPressEnter={() => confirm()}
      style={{ marginBottom: 8, display: 'block' }}
    />
    <Space>
      <Button
        type="primary"
        onClick={() => confirm()}
        icon={<SearchOutlined />}
        size="small"
      >
        Recherche
      </Button>
      <Button
        onClick={() => {
          clearFilters();
          confirm();
        }}
        size="small"
        style={{ width: 90 }}
      >
        Vider
      </Button>
    </Space>
  </div>
));

SearchableDropdown.propTypes = {
  dataIndex: PropTypes.string.isRequired,
  setSelectedKeys: PropTypes.func.isRequired,
  selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  confirm: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchableDropdown;