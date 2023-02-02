/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { SearchOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import SearchableDropdown from 'src/components/SearchableDropdown';
import { useRecoilValue } from 'recoil';
import favoriteBeerAtom from '@recoil/beer/atom/favorite';
import { GiBeerStein } from 'react-icons/gi';
import { Tag } from 'antd';

export default (searchParams) => {
  const searchInput = useRef(null);
  const favoriteBeer = useRecoilValue(favoriteBeerAtom);

  return ({
    title: 'Nom de la bière',
    dataIndex: 'name',
    key: 'beer_name',
    ellipsis: true,
    width: 200,
    filterDropdown: (filterProps) => (
      <SearchableDropdown ref={searchInput} key="name" {...filterProps} dataIndex="name" placeholder="Rechercher par nom de bière" />
    ),
    defaultFilteredValue: searchParams.get('beer_name') ? [searchParams.get('beer_name')] : [],
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text, beer) => <>{favoriteBeer?.id === beer?.id && <Tag icon={<GiBeerStein />} color="gold" />} {text}</>,
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  });
};
