import React from 'react';
import PropTypes from 'prop-types';
import { GiBeerStein } from 'react-icons/gi';
import { Tooltip, Button } from 'antd';

function ToggleFavoriteBeer({ isFavorite, onClick }) {
  return (
    <Tooltip placement="left" title={isFavorite ? 'Ne plus définir comme bière favorite' : 'Définir comme bière favorite'}>
      <Button
        size="large"
        onClick={onClick}
        type={isFavorite ? 'primary' : 'default'}
        shape="circle"
        icon={<GiBeerStein />}
        className="favoriteBtn"
      />
    </Tooltip>
  );
}

ToggleFavoriteBeer.propTypes = {
  isFavorite: PropTypes.bool,
  onClick: PropTypes.func,
};

ToggleFavoriteBeer.defaultProps = {
  isFavorite: false,
  onClick: () => {},
};

export default React.memo(ToggleFavoriteBeer);
