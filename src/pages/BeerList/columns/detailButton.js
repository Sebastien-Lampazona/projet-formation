/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from 'antd';
import { useRef } from 'react';

export default (onDetailClick) => ({
  title: 'Détail',
  key: 'detail',
  width: 100,
  render: (text, record) => (
    <Button onClick={() => onDetailClick?.(record.id)}>Détail</Button>
  ),
});
