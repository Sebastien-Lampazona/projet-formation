import React, { useMemo, useCallback, useState, useImperativeHandle } from 'react';
import { Drawer, Divider } from 'antd';
import { useQuery } from '@tanstack/react-query';
import ApiCaller from 'src/commons/ApiCaller';
import { useRecoilState } from 'recoil';
import favoriteBeerAtom from '@recoil/beer/atom/favorite';
import ToggleFavoriteBeer from 'src/pages/BeerList/components/ToggleFavoriteBeer';
import Header from 'src/pages/BeerList/BeerDetailDrawer/components/Header';
import ListDetails from './components/ListDetails';

function BeerDetailDrawer(_props, ref) {
  const [state, setState] = useState({
    beerID: null,
    initialData: undefined,
  });

  const [favoriteBeer, setFavoriteBeer] = useRecoilState(favoriteBeerAtom);

  const resetDrawer = useCallback(() => setState({
    beerID: null,
    initialData: undefined,
  }), []);

  useImperativeHandle(ref, () => ({
    openDrawer: (_beerID, initialData = []) => {
      setState({
        beerID: _beerID,
        initialData: [initialData],
      });
    },
    closeDrawer: resetDrawer,
  }), []);

  const {
    data,
    status,
    isLoading,
    isSuccess,
    error,
  } = useQuery(['beers', state.beerID], () => {
    if (!state.beerID) return null;
    return ApiCaller.makeRequest('GET', `/beers/${state.beerID}`);
  }, {
    placeholderData: state?.initialData,
    enabled: !!state?.beerID,
  });

  const beerData = useMemo(() => data?.[0] || null, [data]);

  const toggleFavorite = useCallback(() => {
    if (favoriteBeer?.id === beerData?.id) {
      setFavoriteBeer(null);
    }
    else {
      setFavoriteBeer(beerData);
    }
  }, [beerData, favoriteBeer, setFavoriteBeer]);

  return (
    <Drawer
      className="beerDetailDrawer"
      width={640}
      placement="right"
      onClose={resetDrawer}
      open={!!state.beerID}
      title={beerData?.name ? `Détail de la ${beerData?.name}` : null}
    >
      {isSuccess && (
        <>
          <ToggleFavoriteBeer
            isFavorite={favoriteBeer?.id === beerData?.id}
            onClick={toggleFavorite}
          />
          <Header
            beerData={beerData}
            loading={isLoading}
          />

          <Divider>Détail</Divider>
          <ListDetails
            favoriteBeer={favoriteBeer}
            beerData={beerData}
            loading={isLoading}
          />
        </>
      )}

    </Drawer>
  );
}

const ForwardedBeerDetailDrawer = React.forwardRef(BeerDetailDrawer);

ForwardedBeerDetailDrawer.propTypes = {};

export default React.memo(ForwardedBeerDetailDrawer);
