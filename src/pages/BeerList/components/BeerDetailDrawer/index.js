import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';
import { useQuery } from 'react-query';
import ApiCaller from 'src/commons/ApiCaller';

function BeerDetailDrawer(props, ref) {
  const [beerID, setBeerID] = useState(null);

  useImperativeHandle(ref, () => ({
    openDrawer: (_beerID) => {
      setBeerID(_beerID);
    },
    closeDrawer: () => {
      setBeerID(null);
    },
  }), []);

  const {
    data,
    error,
    isLoading,
    isFetching,
    isPreviousData,
  } = useQuery(['beers', beerID], () => {
    if (!beerID) return null;
    return ApiCaller.makeRequest('GET', `/beers/${beerID}`);
  });

  return (
    <Drawer width={640} placement="right" onClose={() => setBeerID(null)} open={!!beerID}>
      <p
        className="site-description-item-profile-p"
        style={{
          marginBottom: 24,
        }}
      >
        User Profile
      </p>
      <p className="site-description-item-profile-p">Personal</p>
      {JSON.stringify(data)}
    </Drawer>
  );
}

BeerDetailDrawer.propTypes = {
  beerID: PropTypes.string.isRequired,
};

export default React.forwardRef(BeerDetailDrawer);
