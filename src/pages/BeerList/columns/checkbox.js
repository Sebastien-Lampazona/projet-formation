/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Checkbox  } from 'antd';

export default (selectedRowKeys, setSelectedRowKeys) => {
  return ({
    dataIndex: 'checkbox',
    key: 'checkbox',
    width: 50,
    render: (text, beer) => <Checkbox 
    checked={selectedRowKeys.includes(beer.id)}
    onChange={() => {
      let newSelectedRowKeys = [...selectedRowKeys];
      if (newSelectedRowKeys.includes(beer.id)) {
        newSelectedRowKeys = newSelectedRowKeys.filter((id) => id !== beer.id);
      } else {
        newSelectedRowKeys.push(beer.id);
      }
      setSelectedRowKeys(newSelectedRowKeys);
    }} />,
  });
};
