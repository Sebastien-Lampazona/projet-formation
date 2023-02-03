import { Button, Space } from 'antd';

export default (onBeerDetail) => ({
    title: 'Action',
    key: 'action',
    width: 100,
    render: (text, record) => (
        <Space size="middle">
            <Button type="primary" onClick={() => onBeerDetail(record.id)}>Détail</Button>
        </Space>
    ),
});